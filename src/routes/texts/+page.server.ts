import type { PageServerLoad } from "./$types";
import { readTexts } from "$lib/server/texts";

export const load: PageServerLoad = async ({ params }) => {
  const result = await readTexts();
  return result;
};
