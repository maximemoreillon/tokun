import type { PageServerLoad } from "./$types";
import { readTexts } from "$lib/server/texts";

export const load: PageServerLoad = async ({ url, locals }) => {
  const session = await locals.auth();
  // TODO: actual error handling
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = session.user.name;

  const { searchParams } = url;
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  const result = await readTexts({
    user_id,
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
  });
  return result;
};
