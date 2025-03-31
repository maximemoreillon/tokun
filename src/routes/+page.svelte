<script lang="ts">
  import Noun from "$lib/noun.svelte";
  let input: string = `お世話になります。\n山田と申します`;

  let tokens: Token[] | null = null;

  async function handleClick() {
    const response = await fetch("/api/tokenize", {
      method: "POST",
      body: JSON.stringify({ text: input }),
    });
    tokens = await response.json();
  }
</script>

<textarea bind:value={input} class="w-full border-1 p-2 rounded-sm" />

<div class="text-center my-2">
  <button on:click={() => handleClick()} class="border-1 rounded-sm px-2 py-1">
    Tokenize
  </button>
</div>

<div>
  {#if tokens}
    {#each tokens as token}
      {#if token.surface_form.includes("\n")}
        <br />
      {:else if token.pos === "名詞"}
        <Noun {token} />
      {:else}
        <span>{token.surface_form}</span>
      {/if}
    {/each}
  {/if}
</div>

<style>
</style>
