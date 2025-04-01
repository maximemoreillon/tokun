<script lang="ts">
  import ScoreButtons from "$lib/scoreButtons.svelte";
  import type { PageProps } from "./$types";
  import { page } from "$app/state";

  let { data: token }: PageProps = $props();

  async function setScore(score: number) {
    const response = await fetch(`/api/tokens/${page.params.id}`, {
      method: "PUT",
      body: JSON.stringify({ score }),
    });
    await response.json();
  }
</script>

<a href="/tokens">← Return to tokens</a>
<h2 class="text-2xl">Token</h2>

<ruby class="my-4 text-2xl">
  {token.surface_form}
  <rt>{token.reading}</rt>
</ruby>

<div>
  Score: {token.score}
</div>

<div>
  <ScoreButtons {token} />
</div>
