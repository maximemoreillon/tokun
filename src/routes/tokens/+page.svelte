<script lang="ts">
  import { page } from "$app/state";
  import Pagination from "$lib/pagination.svelte";
  import ReturnLink from "$lib/returnLink.svelte";
  import TokensFilters from "$lib/tokensFilters.svelte";
  import TokensSearch from "$lib/tokensSearch.svelte";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>

<div class="my-4 flex justify-between items-center">
  <h2 class="text-2xl">Tokens</h2>
  <div class="text-sm">Total: {data.total}</div>
</div>

<div class="my-4 flex justify-between items-center flex-wrap gap-4">
  <TokensSearch />
  <TokensFilters />
</div>

<table class="w-full my-4 table">
  <thead>
    <tr>
      <th class="text-center">Token</th>
      <th class="text-center">Known</th>
      <th class="text-center">Important</th>
    </tr>
  </thead>
  <tbody>
    {#each data.items as token}
      <tr class="">
        <td class="text-center">
          <a href={`/tokens/${token.id}`}>{token.surface_form}</a>
        </td>
        <td class="text-center">
          {token.known ? "✅" : "❌"}
        </td>
        <td class="text-center">
          {token.important ? "❗" : ""}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<Pagination offset={data.offset} limit={data.limit} total={data.total} />
