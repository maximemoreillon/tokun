import { tokenizePromiseFactory } from "$lib/tokenizer.js";

export async function POST(event) {
  const body = await event.request.json();

  const tokens = await tokenizePromiseFactory(body.text);

  console.log(tokens);

  return new Response(JSON.stringify(tokens), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
