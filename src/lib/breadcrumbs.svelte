<script lang="ts">
  import { page } from "$app/state";

  const { pathname } = page.url;
</script>

<div class="flex gap-2">
  <a href="/">Home</a>
  {#each pathname.split("/").slice(1, -1) as segment, segmentIndex}
    <span>/</span>
    <a
      href={`${pathname
        .split("/")
        .slice(0, segmentIndex + 2)
        .join("/")}`}
    >
      {segment}
    </a>
  {/each}
  <span>/</span>

  <span>{pathname.split("/").at(-1)}</span>
</div>
