<script lang="ts">
  import { page } from "$app/state";
  import Pagination from "$lib/pagination.svelte";
  import ReturnLink from "$lib/returnLink.svelte";
  import TokensFilters from "$lib/tokensFilters.svelte";
  import type { PageProps } from "./$types";
  const { searchParams } = page.url;
  let { data }: PageProps = $props();
</script>

<ReturnLink />

<div class="my-4 flex justify-between">
  <h2 class="text-2xl">Tokens</h2>
  <div class="flex flex-col items-center">
    <div>Known / Total</div>
    <div>
      <span class="text-green-700">{data.known}</span>
      / {data.total}
    </div>
  </div>
</div>

<TokensFilters />

<table class="w-full">
  <thead>
    <tr>
      <th>surface_form</th>
      <th>known</th>
    </tr>
  </thead>
  <tbody>
    {#each data.items as token}
      <tr class="border-t-1 border-gray-200">
        <td class="text-center">
          <a href={`/tokens/${token.id}`}>{token.surface_form}</a>
        </td>
        <td class="text-center">
          {token.known ? "✅" : "❌"}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<Pagination offset={data.offset} limit={data.limit} total={data.total} />
