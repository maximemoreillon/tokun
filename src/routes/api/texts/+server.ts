import { db } from "$lib/server/db";
import {
  textsTable,
  tokensTable,
  textTokensTable,
} from "$lib/server/db/schema";
import { tokenizePromiseFactory } from "$lib/tokenizer";
import { eq } from "drizzle-orm";

export async function POST(event) {
  const { content } = await event.request.json();
  if (!content) throw new Error("Missing content");

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

  return new Response(JSON.stringify(registeredText), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(event) {
  const records = await db.select().from(textsTable);

  // const tokens = await tokenizePromiseFactory(body.text);

  return new Response(JSON.stringify({ items: records }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
