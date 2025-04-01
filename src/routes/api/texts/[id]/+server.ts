import { db } from "$lib/server/db";
import {
  textsTable,
  textTokensTable,
  tokensTable,
} from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET({ params }) {
  // TODO: get by ID
  // const [records] = await db.select().from(textsTable).where(eq(textsTable.));

  const tokens = await db
    .select()
    .from(textTokensTable)
    .where(eq(textTokensTable.text_id, Number(params.id)))
    .innerJoin(tokensTable, eq(textTokensTable.id, tokensTable.id));

  // const tokens = await tokenizePromiseFactory(body.text);

  return new Response(JSON.stringify(tokens), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(event) {
  // TODO: get by ID
  const records = await db.select().from(textsTable);

  // const tokens = await tokenizePromiseFactory(body.text);

  return new Response(JSON.stringify({ items: records }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
