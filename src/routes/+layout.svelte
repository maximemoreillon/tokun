<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <!-- this asset will be inlined as a base64 URL -->

  <title>Tokun</title>
</svelte:head>

<!-- <header class="p-2 border-b-1">
  <h1 class="text-3xl">Tokun</h1>
</header> -->
<main class="max-w-2xl mx-auto p-2">
  {@render children()}
</main>
