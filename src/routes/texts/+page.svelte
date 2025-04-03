<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<a href="/">← Home</a>

<h2 class="text-2xl">Texts</h2>

<a href="/texts/new">Register new text</a>

<!-- <table class="w-full">
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
</table> -->

{#each data.items as text}
  <a
    href={`/texts/${text.id}`}
    class="block border-1 rounded p-2 w-full my-2"
    aria-label="text"
  >
    <div>
      {new Date(text.timestamp).toLocaleDateString()}
    </div>

    <div
      class="mt-2 w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
    >
      {text.content}
    </div>
  </a>
{/each}
