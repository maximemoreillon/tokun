import { deleteText } from "$lib/server/texts.js";
import { getUserId } from "$lib/utils";
import { json } from "@sveltejs/kit";

export async function DELETE({ params, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name)
    return new Response("Unauthorized", {
      status: 401,
    });

  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = getUserId(session.user);

  const text_id = Number(params.id);

  await deleteText({ text_id, user_id });

  return json({ id: text_id });
}
