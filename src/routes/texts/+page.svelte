<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<h2 class="text-2xl">Texts</h2>

<a href="/texts/new">Register new text</a>

<table>
  <thead>
    <tr>
      <th> Timestamp </th>
      <th> Content </th>
      <th> See </th>
    </tr>
  </thead>
  <tbody>
    {#each data.items as text}
      <tr>
        <td>
          {new Date(text.timestamp).toLocaleDateString()}
        </td>
        <td>
          {text.content.slice(0, 20)}
        </td>
        <td>
          <a href={`/texts/${text.id}`}>See</a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
