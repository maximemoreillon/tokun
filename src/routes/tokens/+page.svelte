<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<a href="/">← Home</a>

<h2>Tokens</h2>

<table>
  <thead>
    <tr>
      <th> </th>
      <th> See </th>
    </tr>
  </thead>
  <tbody>
    {#each data.items as token}
      <tr>
        <td>
          {token.surface_form}
        </td>
        <td>
          <a href={`/tokens/${token.id}`}>See</a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
