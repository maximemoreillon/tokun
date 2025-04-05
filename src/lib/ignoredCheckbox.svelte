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
    <!-- <button
      disabled={loading}
      class={`border-1 border-green-700 px-1 py-0.5 rounded cursor-pointer ${token.known && "bg-green-200"}`}
      onclick={() => setKnown(true)}>I know this token</button
    >
    <button
      class={`border-1 border-red-700 rounded px-1 py-0.5 cursor-pointer ${
        !token.known && "bg-red-200"
      }`}
      onclick={() => setKnown(false)}
      disabled={loading}
    >
      I don'tknow this token
    </button> -->
    <input
      type="checkbox"
      checked={token.ignored}
      onchange={() => setIgnored(!token.ignored)}
    />

    <label>Ignored</label>
  {/if}
</div>
