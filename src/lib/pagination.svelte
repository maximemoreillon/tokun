<script lang="ts">
  import { page } from "$app/state";
  import { ChevronLeft, ChevronRight } from "@lucide/svelte";
  const { offset, limit, total } = $props();
  const { pathname, searchParams } = page.url;

  function pageHref(dir: -1 | 1) {
    const params = new URLSearchParams(searchParams);
    params.set("offset", String(offset + dir * limit));
    return `${pathname}?${params.toString()}`;
  }
</script>

<div class="join my-4 flex justify-center gap-2">
  {#if offset > 0}
    <a href={pageHref(-1)} class="join-item btn">
      <ChevronLeft />
    </a>
  {/if}
  {#if offset + limit < total}
    <a href={pageHref(1)} class="join-item btn">
      <ChevronRight />
    </a>
  {/if}
</div>
