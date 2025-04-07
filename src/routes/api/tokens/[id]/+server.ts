import { updateToken } from "$lib/server/tokens";

export async function PUT({ params, request, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = session.user.name;

  const id = Number(params.id);
  const properties = await request.json();

  const result = await updateToken(id, properties);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
