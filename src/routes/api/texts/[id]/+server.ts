import { deleteText, getTextAndTokens } from "$lib/server/texts.js";

// export async function GET({ params }) {
//   const id = Number(params.id);

//   const result = await getTextAndTokens(id);

//   return new Response(JSON.stringify(result), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }

export async function DELETE({ params, locals }) {
  const session = await locals.auth();
  if (!session?.user?.name) throw new Error("Unauthorized");
  const user_id = session.user.name;

  const id = Number(params.id);

  await deleteText(id);

  return new Response(JSON.stringify({ id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
