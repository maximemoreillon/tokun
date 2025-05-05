<script lang="ts">
  import Pagination from "$lib/pagination.svelte";
  import TokensFilters from "$lib/tokensFilters.svelte";
  import TokensSearch from "$lib/tokensSearch.svelte";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>

<div class="mt-4 flex justify-between items-center">
  <h2 class="text-2xl">Tokens</h2>
  <div class="text-sm">Total: {data.total}</div>
</div>

<div
  class="my-2 flex lg:justify-between lg:items-end lg:flex-row flex-col gap-2"
>
  <TokensSearch />
  <div class="lg:block hidden flex-grow"></div>
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
