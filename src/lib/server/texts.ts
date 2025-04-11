import { count, desc, eq } from "drizzle-orm";
import { textsTable, textTokensTable, tokensTable } from "./db/schema";
import { db } from "./db";
import { tokenizePromiseFactory } from "$lib/server/tokenizer";

export async function registerText({
  content,
  user_id,
}: {
  content: string;
  user_id: string;
}) {
  const [registeredText] = await db
    .insert(textsTable)
    .values({ content, user_id })
    .returning();

  const tokens = await tokenizePromiseFactory(content);

  for (const token of tokens) {
    let token_id: number;

    const [foundToken] = await db
      .select()
      .from(tokensTable)
      .where(eq(tokensTable.surface_form, token.surface_form));

    token_id = foundToken?.id;

    if (!token_id) {
      const [createdToken] = await db
        .insert(tokensTable)
        .values({ ...token, user_id })
        .onConflictDoNothing()
        .returning();

      token_id = createdToken.id;
    }

    await db
      .insert(textTokensTable)
      .values({
        token_id,
        text_id: registeredText.id,
        position: token.word_position,
      })
      .onConflictDoNothing()
      .returning();
  }

  return registeredText;
}

type ReadTextsOptions = {
  user_id: string;
  limit?: number;
  offset?: number;
};

export async function readTexts(options: ReadTextsOptions) {
  const { user_id, limit = 10, offset = 0 } = options;

  // Using query to easily get the tokens of each text
  const texts = await db.query.textsTable.findMany({
    // with: {
    //   textTokens: {
    //     with: {
    //       token: {},
    //     },
    //   },
    // },
    limit,
    offset,
    where: eq(textsTable.user_id, user_id),
    orderBy: (textsTable) => [desc(textsTable.timestamp)],
  });

  const [{ count: total }] = await db
    .select({ count: count() })
    .from(textsTable)
    .where(eq(textsTable.user_id, user_id));

  return { total, items: texts, offset, limit };
}

export async function getTextAndTokens(textId: number) {
  const [text] = await db
    .select()
    .from(textsTable)
    .where(eq(textsTable.id, textId));

  const result = await db
    .select()
    .from(textTokensTable)
    .where(eq(textTokensTable.text_id, textId))
    .innerJoin(tokensTable, eq(textTokensTable.token_id, tokensTable.id))
    .orderBy(textTokensTable.position);

  return { text, tokens: result.map(({ tokens }) => tokens) };
}

export async function deleteText(id: number) {
  await db.delete(textsTable).where(eq(textsTable.id, id));
}
