import type { PageServerLoad } from "./$types";
import { readToken } from "$lib/server/tokens";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();
  // TODO: actual error handling
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = session.user.name;

  const id = Number(params.id);
  const token = await readToken(id);
  return token;
};
