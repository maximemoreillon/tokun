<script lang="ts">
  import type { PageProps } from "./$types";
  import Noun from "$lib/noun.svelte";
  let { data }: PageProps = $props();
</script>

<a href="/texts">← Return to texts</a>
<h2 class="text-2xl">Text</h2>

{#each data.tokens as token}
  {#if token.surface_form.includes("\n")}
    <br />
  {:else if ["名詞", "動詞"].includes(token.pos)}
    <Noun {token} />
  {:else}
    <span>{token.surface_form}</span>
  {/if}
{/each}
