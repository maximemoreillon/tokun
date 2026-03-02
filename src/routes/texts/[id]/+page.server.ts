import type { PageServerLoad } from "./$types";
import { getTextAndTokens } from "$lib/server/texts.js";
import { getUserId } from "$lib/utils";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();
  // TODO: actual error handling
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = getUserId(session.user);
  const text_id = Number(params.id);
  const result = await getTextAndTokens({ text_id, user_id });

  return result;
};
