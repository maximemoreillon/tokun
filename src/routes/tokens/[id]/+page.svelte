<script lang="ts">
  import ReturnLink from "$lib/returnLink.svelte";
  import TextList from "$lib/textList.svelte";
  import TokenDetails from "$lib/tokenDetails.svelte";
  import type { PageProps } from "./$types";

  let { data: token }: PageProps = $props();
</script>

<ReturnLink />

<div class="my-4 flex flex-col items-center">
  <TokenDetails
    {token}
    onUpdate={(updatedToken) => {
      token = { ...token, ...updatedToken };
    }}
  />
</div>

<div>
  <div>
    {token.occurences} occurences
  </div>

  <TextList texts={token.texts} />
</div>
