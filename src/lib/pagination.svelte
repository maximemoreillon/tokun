<script lang="ts">
  const { offset, limit, total, route } = $props();
</script>

<div class="flex justify-center gap-4">
  {#if offset > 0}
    <a href={`${route}?offset=${offset - limit}`}>Prev</a>
  {/if}
  {#if offset + limit < total}
    <a href={`${route}?offset=${offset + limit}`}>Next</a>
  {/if}
</div>
