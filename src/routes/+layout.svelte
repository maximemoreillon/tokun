<script lang="ts">
  import DarkModeToggle from "$lib/darkModeToggle.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>Tokun</title>
</svelte:head>

<header class="p-2 border-b-1 flex justify-between">
  <h1 class="text-5xl">Tokun</h1>
  <DarkModeToggle />
</header>

<main class="max-w-2xl mx-auto p-2">
  {@render children()}
</main>
