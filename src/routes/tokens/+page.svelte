<script lang="ts">
  import Pagination from "$lib/pagination.svelte";
  import ReturnLink from "$lib/returnLink.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<ReturnLink />

<div class="my-4 flex justify-between">
  <h2 class="text-2xl">Tokens</h2>
  <div>
    Total: {data.total}
  </div>
</div>

<table class="w-full">
  <thead>
    <tr>
      <th>surface_form</th>
      <th>known</th>
    </tr>
  </thead>
  <tbody>
    {#each data.items as token}
      <tr>
        <td class="text-center">
          <a href={`/tokens/${token.id}`}>{token.surface_form}</a>
        </td>
        <td class="text-center">
          {token.known && "✅"}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<Pagination offset={data.offset} limit={data.limit} total={data.total} />
