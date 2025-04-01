import type { PageServerLoad } from "./$types";
import { readToken } from "$lib/server/tokens";

export const load: PageServerLoad = async ({ params }) => {
  const id = Number(params.id);
  const token = await readToken(id);
  return token;
};
