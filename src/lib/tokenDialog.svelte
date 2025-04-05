<script lang="ts">
  import IgnoredCheckbox from "./ignoredCheckbox.svelte";
  import KnownCheckbox from "./knownCheckbox.svelte";
  import type { tokensTable } from "./server/db/schema";

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

<!-- Problem: dialog creates a space -->
<div
  bind:this={backdrop}
  onclick={handleBackdropClick}
  class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-md flex justify-center items-center"
>
  <div class="bg-white p-8 relative flex flex-col items-center rounded gap-4">
    <button
      class="absolute top-2 right-2 p-2 cursor-pointer"
      onclick={() => {
        onClose();
      }}
    >
      X
    </button>

    <ruby class="text-3xl">
      {token.surface_form}
      <rt>{token.reading}</rt>
    </ruby>

    {#if !token.ignored}
      <KnownCheckbox {token} {onUpdate} />
    {/if}
    <IgnoredCheckbox {token} {onUpdate} />

    <div>
      <a href={`/tokens/${token.id}`}>Details</a>
    </div>
  </div>
</div>
