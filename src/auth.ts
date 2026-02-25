import { SvelteKitAuth } from "@auth/sveltekit";
import Auth0 from "@auth/sveltekit/providers/auth0";
import Keycloak from "@auth/sveltekit/providers/keycloak";
import { env } from "$env/dynamic/private";

const providers = [];

const { AUTH_KEYCLOAK_ISSUER, AUTH_AUTH0_ISSUER } = env;

if (AUTH_KEYCLOAK_ISSUER) providers.push(Keycloak);
if (AUTH_AUTH0_ISSUER) providers.push(Auth0);

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers,
  trustHost: true,
});
