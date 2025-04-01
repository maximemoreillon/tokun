import type { PageServerLoad } from "./$types";
import { readTokens } from "$lib/server/tokens";

export const load: PageServerLoad = async ({ params }) => {
  const result = await readTokens();
  return result;
};
