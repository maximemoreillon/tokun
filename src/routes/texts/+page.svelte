<script lang="ts">
  // import { tokenIsValid } from "$lib";
  import TextPreview from "$lib/textPreview.svelte";
  import Pagination from "$lib/pagination.svelte";
  import ReturnLink from "$lib/returnLink.svelte";
  import type { PageProps } from "./$types";
  import TextList from "$lib/textList.svelte";

  let { data }: PageProps = $props();
</script>

<div class="flex justify-between my-4">
  <h2 class="text-3xl">Texts</h2>

  <a href="/texts/new" class="btn btn-primary"> Register new text </a>
</div>

<TextList texts={data.items} />
<!-- <div class="flex flex-col gap-2">
  {#each data.items as text}
    <TextPreview {text} />
  {/each}
</div> -->

<Pagination offset={data.offset} limit={data.limit} total={data.total} />
