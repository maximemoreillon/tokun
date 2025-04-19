<script lang="ts">
  // import { tokenIsValid } from "$lib";
  import TextPreview from "$lib/textPreview.svelte";
  import Pagination from "$lib/pagination.svelte";
  import ReturnLink from "$lib/returnLink.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<ReturnLink />

<div class="flex justify-between">
  <h2 class="text-2xl">Texts</h2>

  <a href="/texts/new" class="btn btn-primary"> Register new text </a>
</div>

<div class="flex flex-col gap-2">
  {#each data.items as text}
    <TextPreview {text} />
  {/each}
</div>

<Pagination offset={data.offset} limit={data.limit} total={data.total} />
