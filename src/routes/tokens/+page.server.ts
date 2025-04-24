import type { PageServerLoad } from "./$types";
import { readTokens } from "$lib/server/tokens";

export const load: PageServerLoad = async ({ url, locals }) => {
  const session = await locals.auth();
  // TODO: actual error handling
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = session.user.name;

  const { searchParams } = url;
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const important = searchParams.get("important");
  const known = searchParams.get("known");
  const search = searchParams.get("search");

  const result = await readTokens({
    user_id,
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
    // dirty
    important: important !== null ? important === "true" : undefined,
    known: known !== null ? known === "true" : undefined,
    search: search !== null ? search : undefined,
  });
  return result;
};
