<script lang="ts">
  import type { tokensTable } from "./server/db/schema";

  let { onUpdate, token } = $props<{
    token: typeof tokensTable.$inferSelect;
    onUpdate: {
      (updatedToken: typeof tokensTable.$inferSelect): void;
    };
  }>();

  // export let token: typeof tokensTable.$inferSelect;

  let loading = $state(false);

  async function setKnown(known: boolean) {
    loading = true;
    const response = await fetch(`/api/tokens/${token.id}`, {
      method: "PUT",
      body: JSON.stringify({ known }),
    });
    const updatedToken = await response.json();
    // token = updatedToken; // Does not work
    onUpdate(updatedToken);
    loading = false;
  }
</script>

<div>
  {#if loading}
    <div>Loading...</div>
  {:else}
    <input
      id="known_checkbox"
      class="cursor-pointer w-5 h-5"
      type="checkbox"
      checked={token.known}
      onchange={() => setKnown(!token.known)}
    />
    <label for="known_checkbox" class="text-xl">Known</label>
  {/if}
</div>
