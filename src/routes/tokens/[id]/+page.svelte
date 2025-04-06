<script lang="ts">
  import ReturnLink from "$lib/returnLink.svelte";
  import TokenDetails from "$lib/tokenDetails.svelte";
  import type { PageProps } from "./$types";

  let { data: token }: PageProps = $props();
</script>

<ReturnLink />

<div class="my-4 flex justify-center">
  <TokenDetails {token} />
</div>
