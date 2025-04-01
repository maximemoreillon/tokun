<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<h2 class="text-2xl">Texts</h2>

<a href="/texts/new">Register new text</a>

<div>
  {#each data.items as text}
    <a href={`/texts/${text.id}`}>{text.content}</a>
  {/each}
</div>
