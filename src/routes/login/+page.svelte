<script>
  import { SignIn, SignOut } from "@auth/sveltekit/components";
  import { page } from "$app/state";
</script>

<a href="/">← Home</a>

<h2 class="text-2xl">Auth</h2>
<div>
  {#if page.data.session}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{page.data.session.user?.name ?? "User"}</strong>
    </span>
    <SignOut>
      <div slot="submitButton" class="buttonPrimary">Sign out</div>
    </SignOut>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <SignIn>
      <div slot="submitButton" class="buttonPrimary">Sign in</div>
    </SignIn>
  {/if}
</div>
