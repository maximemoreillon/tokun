import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async (event) => {
  // TODO: enforce auth everywhere

  const session = await event.locals.auth();

  const { pathname } = event.url;

  if (!session?.user && !["/signin", "/login"].includes(pathname))
    throw redirect(303, "/login");

  return {
    session: await event.locals.auth(),
  };
};
