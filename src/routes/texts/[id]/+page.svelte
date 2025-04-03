<script lang="ts">
  import type { PageProps } from "./$types";
  import Noun from "$lib/noun.svelte";
  import { validPosList } from "$lib/config";
  import type { tokensTable } from "$lib/server/db/schema";
  import { goto } from "$app/navigation";

  let { data }: PageProps = $props();

  // This seems to have been necessary
  const tokens = $state(data.tokens);

  function onUpdate(updatedToken: typeof tokensTable.$inferSelect) {
    // TODO: maybe there's a simpler way to go about this
    tokens.forEach((t, i) => {
      if (t.id === updatedToken.id) {
        tokens[i] = updatedToken;
      }
    });
  }

  async function handleDeleteButtonClick() {
    const response = await fetch(`/api/texts/${data.text.id}`, {
      method: "DELETE",
    });
    if (!response.ok) return alert("Error");
    goto(`/texts`);
  }
</script>

<a href="/texts">← Return to texts</a>

<div class="flex justify-between">
  <h2 class="text-2xl">Text {data.text.id}</h2>
  <button onclick={() => handleDeleteButtonClick()}>Delete</button>
</div>

{#each tokens as token, index}
  {#if token.surface_form.includes("\n")}
    <br />
  {:else if validPosList.includes(token.pos) && token.reading}
    <Noun token={tokens[index]} {onUpdate} />
  {:else}
    <span>{token.surface_form}</span>
  {/if}
{/each}
