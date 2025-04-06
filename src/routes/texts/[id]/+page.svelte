<script lang="ts">
  import type { PageProps } from "./$types";
  import Noun from "$lib/noun.svelte";
  import { validPosList } from "$lib/config";
  import type { tokensTable } from "$lib/server/db/schema";
  import { goto } from "$app/navigation";
  import TokenDialog from "$lib/tokenDialog.svelte";
  import ReturnLink from "$lib/returnLink.svelte";

  let { data }: PageProps = $props();

  let selectedTokenIndex: number | null = $state(null);
  let options = $state({
    highlightUnknown: true,
    highlightKnown: false,
  });

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
    if (!confirm("Are you sure you want to delete this text?")) return;
    const response = await fetch(`/api/texts/${data.text.id}`, {
      method: "DELETE",
    });
    if (!response.ok) return alert("Error");
    goto(`/texts`);
  }
</script>

<ReturnLink />

<div class="flex justify-between my-4">
  <div>
    {data.text.timestamp.toLocaleDateString()}
  </div>
  <button
    onclick={() => handleDeleteButtonClick()}
    class="py-1 px-2 rounded border-1 border-red-700 text-red-700"
    >Delete</button
  >
</div>

<div class="flex gap-2 my-4">
  <label>
    <input type="checkbox" bind:checked={options.highlightUnknown} />
    Highlight unknown
  </label>
  <label>
    <input type="checkbox" bind:checked={options.highlightKnown} />
    Highlight known
  </label>
</div>

{#each tokens as token, index}
  {#if token.surface_form.includes("\n")}
    <br />
  {:else if validPosList.includes(token.pos) && token.reading}
    <Noun
      token={tokens[index]}
      onTokenClicked={() => (selectedTokenIndex = index)}
      {options}
    />
  {:else}
    <span>{token.surface_form}</span>
  {/if}
{/each}

{#if selectedTokenIndex !== null}
  <TokenDialog
    token={tokens[selectedTokenIndex]}
    {onUpdate}
    onClose={() => (selectedTokenIndex = null)}
  />
{/if}
