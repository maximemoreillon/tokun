<script lang="ts">
  let input: string = `お世話になります。
  山田と申します`;

  let tokens: any[] | null = null;

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
  <button on:click={() => handleClick()} class="border-1 rounded-sm px-2 py-1"
    >Tokenize</button
  >
</div>

<div>
  {#if tokens}
    {#each tokens as token}
      {#if token.surface_form.includes("\n")}
        <br />
      {:else if token.pos === "名詞"}
        <span class="border-b-1">{token.surface_form}</span>
        <!-- <ruby class="">{token.surface_form}<rt>{token.reading}</rt></ruby> -->
      {:else}
        <span>{token.surface_form}</span>
      {/if}
    {/each}
  {/if}
</div>

<style>
</style>
