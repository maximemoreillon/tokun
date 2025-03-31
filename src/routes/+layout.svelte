<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<header class="text-3xl p-1 border-b-1 mb-1">
  <h1>Tokun</h1>
</header>
<main class="max-w-2xl mx-auto">
  {@render children()}
</main>
