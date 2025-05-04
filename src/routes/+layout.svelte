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

<div class="drawer">
  <input id="drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <header class="navbar px-4 w-full">
      <div class="navbar-start flex gap-6">
        <div class="dropdown lg:hidden">
          <label
            for="drawer"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <Menu />
          </label>
        </div>

        <h1 class="text-3xl">Tokun</h1>

        <nav class="hidden lg:flex tabs tabs-border flex-nowrap">
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

    <main class="max-w-4xl mx-auto p-2 w-full">
      {@render children()}
    </main>
  </div>

  <div class="drawer-side">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"
    ></label>
    <ul class="menu bg-base-200 text-base-content min-h-full w-60 p-4">
      <li>
        <a href="/texts">Texts</a>
      </li>
      <li>
        <a href="/tokens">Tokens</a>
      </li>
    </ul>
  </div>
</div>
