import { eq } from "drizzle-orm";
import { textsTable, textTokensTable, tokensTable } from "./db/schema";
import { db } from "./db";
import { tokenizePromiseFactory } from "$lib/tokenizer";

export async function registerText(content: string) {
  const [registeredText] = await db
    .insert(textsTable)
    .values({ content })
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
        .values(token)
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

export async function getTexts() {
  const texts = await db.select().from(textsTable);
  return texts;
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
