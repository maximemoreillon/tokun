import { registerText } from "$lib/server/texts";

export async function POST({ request, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = session.user.name;

  const { content } = await request.json();
  if (!content) throw new Error("Missing content");

  const registeredText = await registerText({ content, user_id });

  return new Response(JSON.stringify(registeredText), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
