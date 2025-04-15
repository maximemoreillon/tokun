<script lang="ts">
  import type { tokensTable } from "./server/db/schema";
  import TokenDetails from "./tokenDetails.svelte";

  let backdrop: HTMLDivElement;

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

<div
  bind:this={backdrop}
  onclick={handleBackdropClick}
  class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-md flex justify-center items-center"
>
  <div
    class="bg-white dark:bg-gray-800 p-8 relative flex flex-col items-center rounded gap-4 shadow"
  >
    <TokenDetails {token} {onUpdate} />

    <div class="flex gap-4 justify-between">
      <a href={`/tokens/${token.id}`}>Details</a>
      <button class="cursor-pointer" onclick={onClose}> Close </button>
    </div>
  </div>
</div>
