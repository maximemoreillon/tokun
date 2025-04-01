import type { PageServerLoad } from "./$types";
import { getTexts } from "$lib/server/texts";

export const load: PageServerLoad = async ({ params }) => {
  const items = await getTexts();
  return { items };
};
