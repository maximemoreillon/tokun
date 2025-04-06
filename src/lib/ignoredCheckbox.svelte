<script lang="ts">
  import type { tokensTable } from "./server/db/schema";

  let { onUpdate, token } = $props<{
    token: typeof tokensTable.$inferSelect;
    onUpdate: {
      (updatedToken: typeof tokensTable.$inferSelect): void;
    };
  }>();

  let loading = $state(false);

  async function setIgnored(ignored: boolean) {
    loading = true;
    const response = await fetch(`/api/tokens/${token.id}`, {
      method: "PUT",
      body: JSON.stringify({ ignored }),
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
        type="checkbox"
        checked={token.ignored}
        onchange={() => setIgnored(!token.ignored)}
      />
      Ignored
    </label>
  {/if}
</div>
