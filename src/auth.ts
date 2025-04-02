import { SvelteKitAuth } from "@auth/sveltekit";
// import Auth0 from "@auth/sveltekit/providers/auth0";
import Keycloak from "@auth/sveltekit/providers/keycloak";
export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [
    Keycloak,
    // GitHub,
  ],
});
