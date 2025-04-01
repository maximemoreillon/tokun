import { updateToken } from "$lib/server/tokens";

export async function PUT({ params, request }) {
  const id = Number(params.id);
  const properties = await request.json();

  const result = await updateToken(id, properties);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
