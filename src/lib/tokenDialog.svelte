<script lang="ts">
  import type { tokensTable } from "./server/db/schema";
  import TokenDetails from "./tokenDetails.svelte";

  let backdrop: HTMLDialogElement;

  const { token, onUpdate, onClose } = $props<{
    token: typeof tokensTable.$inferSelect;
    onUpdate: {
      (updatedToken: typeof tokensTable.$inferSelect): void;
    };
    onClose: () => void;
  }>();

  function handleBackdropClick(event: Event) {
    if (event.target === backdrop) onClose();
  }
</script>

<!-- TODO: still not a correct use of the dialog element -->
<dialog onclick={handleBackdropClick} class="modal" open bind:this={backdrop}>
  <div class="modal-box w-sm">
    <TokenDetails {token} {onUpdate} />

    <div class="modal-action">
      <a href={`/tokens/${token.id}`} class="btn btn-outline">Details</a>
      <button class="btn" onclick={onClose}> Close </button>
    </div>
  </div>
</dialog>
