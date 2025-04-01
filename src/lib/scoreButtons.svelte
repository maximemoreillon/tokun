<script lang="ts">
  import type { tokensTable } from "./server/db/schema";

  export let token: typeof tokensTable.$inferSelect;

  let loading = false;

  async function setScore(score: number) {
    loading = true;
    const response = await fetch(`/api/tokens/${token.id}`, {
      method: "PUT",
      body: JSON.stringify({ score }),
    });
    await response.json();
    loading = false;
  }
</script>

<div>
  {#if loading}
    <div>Loading...</div>
  {:else}
    <button
      disabled={loading}
      class="border-1 border-green-700 px-1 py-0.5 cursor-pointer"
      onclick={() => setScore(1)}>I know this token</button
    >
    <button
      class="border-1 border-red-700 px-1 py-0.5 cursor-pointer"
      onclick={() => setScore(-1)}
      disabled={loading}
    >
      I don'tknow this token
    </button>
  {/if}
</div>
