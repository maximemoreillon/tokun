<script>
  import { SignIn, SignOut } from "@auth/sveltekit/components";
  import { page } from "$app/state";
  import ReturnLink from "$lib/returnLink.svelte";
</script>

<ReturnLink />

<h2 class="text-2xl my-4">Auth</h2>
<div>
  {#if page.data.session}
    <div class="my-4">
      <small>Signed in as</small>
      <strong>{page.data.session.user?.name ?? "User"}</strong>
    </div>
    <SignOut>
      <div slot="submitButton" class="btn">Sign out</div>
    </SignOut>
  {:else}
    <div class="my-4">You are not signed in</div>
    <SignIn>
      <div slot="submitButton" class="btn">Sign in</div>
    </SignIn>
  {/if}
</div>
