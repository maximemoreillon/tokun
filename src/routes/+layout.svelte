<script lang="ts">
  import DarkModeToggle from "$lib/darkModeToggle.svelte";
  import { page } from "$app/state";
  import "../app.css";
  let { children } = $props();
</script>

<svelte:head>
  <title>Tokun</title>
</svelte:head>

<header class="navbar">
  <div class="navbar-start">
    <h1 class="text-4xl">Tokun</h1>
  </div>
  <div class="navbar-center">
    <div role="tablist" class="tabs tabs-border">
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
