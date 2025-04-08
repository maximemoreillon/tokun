import { db } from "$lib/server/db";
import { tokensTable } from "$lib/server/db/schema";
import { textTokensTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { getTextAndTokens } from "$lib/server/texts.js";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();
  // TODO: actual error handling
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = session.user.name;
  const id = Number(params.id);
  const result = await getTextAndTokens(id);

  return result;
};
