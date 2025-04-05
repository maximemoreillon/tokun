<script lang="ts">
  import KnownCheckbox from "$lib/knownCheckbox.svelte";
  import type { PageProps } from "./$types";

  let { data: token }: PageProps = $props();
</script>

<a href="/tokens">← Return to tokens</a>
<h2 class="text-2xl">Token</h2>

<ruby class="my-4 text-2xl">
  {token.surface_form}
  <rt>{token.reading}</rt>
</ruby>

<div>
  <KnownCheckbox
    {token}
    onUpdate={(updatedToken) => (token = { ...token, ...updatedToken })}
  />
</div>
