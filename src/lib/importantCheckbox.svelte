<script lang="ts">
  import type { tokensTable } from "./server/db/schema";

  let { onUpdate, token } = $props<{
    token: typeof tokensTable.$inferSelect;
    onUpdate: {
      (updatedToken: typeof tokensTable.$inferSelect): void;
    };
  }>();

  let loading = $state(false);

  async function setimportant(important: boolean) {
    loading = true;
    const response = await fetch(`/api/tokens/${token.id}`, {
      method: "PUT",
      body: JSON.stringify({ important }),
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
        class="checkbox"
        type="checkbox"
        checked={token.important}
        onchange={() => setimportant(!token.important)}
      />
      important
    </label>
  {/if}
</div>
