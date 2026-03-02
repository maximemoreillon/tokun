import { updateToken } from "$lib/server/tokens";
import { getUserId } from "$lib/utils.js";
import { json } from "@sveltejs/kit";

export async function PUT({ params, request, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = getUserId(session.user);

  const token_id = Number(params.id);
  const properties = await request.json();

  const result = await updateToken({ user_id, token_id, properties });

  return json(result);
}
