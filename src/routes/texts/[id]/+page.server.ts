import { db } from "$lib/server/db";
import { tokensTable } from "$lib/server/db/schema";
import { textTokensTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const result = await db
    .select()
    .from(textTokensTable)
    .where(eq(textTokensTable.text_id, Number(params.id)))
    .innerJoin(tokensTable, eq(textTokensTable.token_id, tokensTable.id))
    .orderBy(textTokensTable.position);

  // const tokens = await tokenizePromiseFactory(body.text);

  return { tokens: result.map(({ tokens }) => tokens) };
};
