<script lang="ts">
  import DarkModeToggle from "$lib/darkModeToggle.svelte";
  import { page } from "$app/state";
  import "../app.css";
  import LogoutButton from "$lib/logoutButton.svelte";
  let { children } = $props();
</script>

<svelte:head>
  <title>Tokun</title>
</svelte:head>

<header class="navbar">
  <div class="navbar-start flex gap-8">
    <h1 class="text-4xl">Tokun</h1>
    <div role="tablist" class="tabs tabs-border flex-nowrap">
      <a
        role="tab"
        class="tab"
        class:tab-active={page.url.pathname.startsWith("/texts")}
        href="/texts">Texts</a
      >
      <a
        role="tab"
        class="tab"
        class:tab-active={page.url.pathname.startsWith("/tokens")}
        href="/tokens">Tokens</a
      >
    </div>
  </div>
  <div class="navbar-end">
    <DarkModeToggle />
  </div>
</header>

<main class="max-w-4xl mx-auto p-2">
  {@render children()}
</main>
