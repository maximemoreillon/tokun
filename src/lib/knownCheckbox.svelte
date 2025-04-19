<script lang="ts">
  import type { tokensTable } from "./server/db/schema";

  let { onUpdate, token } = $props<{
    token: typeof tokensTable.$inferSelect;
    onUpdate: {
      (updatedToken: typeof tokensTable.$inferSelect): void;
    };
  }>();

  let loading = $state(false);

  async function setKnown(known: boolean) {
    loading = true;
    const response = await fetch(`/api/tokens/${token.id}`, {
      method: "PUT",
      body: JSON.stringify({ known }),
    });
    const updatedToken = await response.json();
    onUpdate(updatedToken);
    loading = false;
  }
</script>

<div>
  {#if loading}
    <div>Loading...</div>
  {:else}
    <label>
      <input
        class="checkbox checkbox-lg"
        type="checkbox"
        checked={token.known}
        onchange={() => setKnown(!token.known)}
      />
      Known
    </label>
  {/if}
</div>
