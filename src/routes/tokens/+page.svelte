<script lang="ts">
  import { page } from "$app/state";
  import Pagination from "$lib/pagination.svelte";
  import ReturnLink from "$lib/returnLink.svelte";
  import TokensFilters from "$lib/tokensFilters.svelte";
  import type { PageProps } from "./$types";
  let { data }: PageProps = $props();
</script>

<ReturnLink />

<h2 class="text-2xl">Tokens</h2>
<div class="my-4 flex justify-between items-center">
  <TokensFilters />
  <div>{data.total} tokens</div>
</div>

<table class="w-full my-4 table">
  <thead>
    <tr>
      <th>Token</th>
      <th class="text-center">Known</th>
      <th class="text-center">Important</th>
    </tr>
  </thead>
  <tbody>
    {#each data.items as token}
      <tr class="">
        <td class="">
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
