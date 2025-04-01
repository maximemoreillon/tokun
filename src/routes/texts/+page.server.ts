import { db } from "$lib/server/db";
import { textsTable, tokensTable } from "$lib/server/db/schema";
import { textTokensTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const result = await db.select().from(textsTable);

  // const tokens = await tokenizePromiseFactory(body.text);

  return { items: result };
};
