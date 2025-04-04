import type { PageServerLoad } from "./$types";
import { readTokens } from "$lib/server/tokens";

export const load: PageServerLoad = async ({ url }) => {
  const { searchParams } = url;
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  const result = await readTokens({
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
  });
  return result;
};
