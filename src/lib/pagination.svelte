<script lang="ts">
  import { page } from "$app/state";
  const { offset, limit, total } = $props();
  const { pathname, searchParams } = page.url;

  function pageHref(dir: -1 | 1) {
    const params = new URLSearchParams(searchParams);
    params.set("offset", String(offset + dir * limit));
    return `${pathname}?${params.toString()}`;
  }
</script>

<div class="flex justify-center gap-4">
  {#if offset > 0}
    <a href={pageHref(-1)}>Prev</a>
  {/if}
  {#if offset + limit < total}
    <a href={pageHref(1)}>Next</a>
  {/if}
</div>
