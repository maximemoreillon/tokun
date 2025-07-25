import { updateToken } from "$lib/server/tokens";
import { json } from "@sveltejs/kit";

export async function PUT({ params, request, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name)
    return new Response("Unauthorized", {
      status: 401,
    });

  const id = Number(params.id);
  const properties = await request.json();

  // TODO: only allow updating one's tokens
  const result = await updateToken(id, properties);

  return json(result);
}
