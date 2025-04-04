import type { PageServerLoad } from "./$types";
import { readTexts } from "$lib/server/texts";

export const load: PageServerLoad = async ({ url }) => {
  const { searchParams } = url;
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  const result = await readTexts({
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
  });
  return result;
};
