<script lang="ts">
  import type { PageProps } from "./$types";
  import Noun from "$lib/noun.svelte";
  import { validPosList } from "$lib/config";
  import type { tokensTable } from "$lib/server/db/schema";

  let { data }: PageProps = $props();

  const tokens = $state(data.tokens);

  function onUpdate(updatedToken: typeof tokensTable.$inferSelect) {
    // TODO: maybe there's a simpler way to go about this
    tokens.forEach((t, i) => {
      if (t.id === updatedToken.id) {
        tokens[i] = updatedToken;
      }
    });
  }
</script>

<a href="/texts">← Return to texts</a>
<h2 class="text-2xl">Text</h2>

{#each tokens as token, index}
  {#if token.surface_form.includes("\n")}
    <br />
  {:else if validPosList.includes(token.pos)}
    <Noun token={tokens[index]} {onUpdate} />
  {:else}
    <span>{token.surface_form}</span>
  {/if}
{/each}
