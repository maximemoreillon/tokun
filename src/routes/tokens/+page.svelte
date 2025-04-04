<script lang="ts">
  import Pagination from "$lib/pagination.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<a href="/">← Home</a>

<h2>Tokens</h2>

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

<Pagination
  offset={data.offset}
  limit={data.limit}
  total={data.total}
  route="/tokens"
/>
