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

  const registeredText = await registerText(content);

  return new Response(JSON.stringify(registeredText), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
