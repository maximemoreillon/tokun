<script lang="ts">
  import ScoreButtons from "./scoreButtons.svelte";
  import type { tokensTable } from "./server/db/schema";

  let dialog: HTMLDialogElement;
  export let token: typeof tokensTable.$inferSelect;

  function handleBackdropClick(event: Event) {
    if (event.target === dialog) dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  on:click={handleBackdropClick}
  class="backdrop:bg-black/50 backdrop:backdrop-blur-md mx-auto my-8 p-4 max-w-xl w-full relative rounded-sm"
>
  <button
    class="absolute top-2 right-2 p-2 cursor-pointer"
    on:click={() => {
      dialog.close();
    }}
  >
    X
  </button>
  <div class="text-center">
    <ruby class="my-4 text-2xl">
      {token.surface_form}
      <rt>{token.reading}</rt>
    </ruby>

    <ScoreButtons {token} />

    <div>
      <a href={`/tokens/${token.id}`}>Details</a>
    </div>
  </div>
</dialog>

<button
  class={`cursor-pointer ${token.score <= 0 && "text-red-700"}`}
  on:click={() => dialog.showModal()}
>
  {token.surface_form}
</button>
