import { registerText } from "$lib/server/texts";
import { getUserId } from "$lib/utils.js";
import { json } from "@sveltejs/kit";

export async function POST({ request, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name)
    return new Response("Unauthorized", {
      status: 401,
    });
  const user_id = getUserId(session.user);

  const { content } = await request.json();
  if (!content) throw new Error("Missing content");

  const registeredText = await registerText({ content, user_id });

  return json(registeredText);
}
