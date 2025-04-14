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

  <a href="/texts/new" class="rounded py-1 px-2 bg-red-700 text-white">
    Register new text
  </a>
</div>

{#each data.items as text}
  <TextPreview {text} />
{/each}

<Pagination offset={data.offset} limit={data.limit} total={data.total} />
