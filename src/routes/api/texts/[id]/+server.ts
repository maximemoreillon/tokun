import { deleteText } from "$lib/server/texts.js";
import { json } from "@sveltejs/kit";

export async function DELETE({ params, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name)
    return new Response("Unauthorized", {
      status: 401,
    });

  const id = Number(params.id);

  // TODO: only allow deleting one's texts
  await deleteText(id);

  return json({ id });
}
