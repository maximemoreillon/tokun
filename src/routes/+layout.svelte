<script lang="ts">
  import DarkModeToggle from "$lib/darkModeToggle.svelte";
  import { page } from "$app/state";
  import "../app.css";
  import LogoutButton from "$lib/logoutButton.svelte";
  import { Menu } from "@lucide/svelte";
  let { children } = $props();
</script>

<svelte:head>
  <title>Tokun</title>
</svelte:head>

<header class="navbar">
  <div class="navbar-start flex gap-6">
    <div class="dropdown lg:hidden">
      <div class="btn btn-ghost btn-circle" tabindex={0} role="button">
        <Menu />
      </div>
      <ul
        class="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        tabindex={0}
      >
        <li>
          <a href="/texts">Texts</a>
        </li>
        <li>
          <a href="/tokens">Tokens</a>
        </li>
      </ul>
    </div>

    <h1 class="text-3xl">Tokun</h1>

    <nav role="tablist" class="hidden lg:flex tabs tabs-border flex-nowrap">
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
    </nav>
  </div>
  <div class="navbar-end flex gap-4">
    <DarkModeToggle />
    <LogoutButton />
  </div>
</header>

<main class="max-w-4xl mx-auto p-2">
  {@render children()}
</main>
