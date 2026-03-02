import type { PageServerLoad } from "./$types";
import { readToken } from "$lib/server/tokens";
import { getUserId } from "$lib/utils";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();
  // TODO: actual error handling
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = getUserId(session.user);

  const token_id = Number(params.id);
  const token = await readToken({ user_id, token_id });
  return token;
};
