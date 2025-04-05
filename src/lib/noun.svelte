<script lang="ts">
  // import KnwonButtons from "./knownButtons.svelte";
  import type { tokensTable } from "./server/db/schema";

  // let dialog: HTMLDialogElement;

  const { token, onTokenClicked } = $props<{
    token: typeof tokensTable.$inferSelect;
    onTokenClicked: () => void;

    // onUpdate: {
    //   (updatedToken: typeof tokensTable.$inferSelect): void;
    // };
  }>();

  // function handleBackdropClick(event: Event) {
  //   if (event.target === dialog) dialog.close();
  // }
</script>

<!-- Problem: dialog creates a space -->
<!-- <dialog
  bind:this={dialog}
  onclick={handleBackdropClick}
  class="backdrop:bg-black/50 backdrop:backdrop-blur-md mx-auto my-8 p-4 relative rounded-sm"
>
  <button
    class="absolute top-2 right-2 p-2 cursor-pointer"
    onclick={() => {
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

    <KnwonButtons {token} {onUpdate} />

    <div>
      <a href={`/tokens/${token.id}`}>Details</a>
    </div>
  </div>
</dialog> -->

<span
  class={`cursor-pointer ${!token.known && "text-red-700"}`}
  onclick={() => onTokenClicked()}
  onkeydown={() => {}}
>
  {token.surface_form}
</span>
