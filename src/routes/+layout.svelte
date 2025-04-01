<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<header class="p-2 border-b-1 mb-1">
  <h1 class="text-3xl">Tokun</h1>
</header>
<main class="max-w-2xl mx-auto">
  {@render children()}
</main>
