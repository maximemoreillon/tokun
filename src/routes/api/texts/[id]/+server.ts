import { getTextAndTokens } from "$lib/server/texts.js";

export async function GET({ params }) {
  const id = Number(params.id);

  const result = await getTextAndTokens(id);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
