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

<div>
  <textarea bind:value={input} />
  <button on:click={() => handleClick()}>Tokenize</button>
</div>

<div>
  {#if tokens}
    {#each tokens as token}
      {#if token.surface_form === "\n"}
        <br />
      {:else if token.pos === "名詞"}
        <ruby class="token">{token.surface_form}<rt>{token.reading}</rt></ruby>
      {:else}
        <span>{token.surface_form}</span>
      {/if}
    {/each}
  {/if}
</div>

<style>
  .token {
    transition: font-size 0.3s;
    margin-inline: 1px;
    cursor: pointer;
    border-bottom: 1px solid green;
  }

  .token:hover {
    font-size: 200%;
  }
</style>
