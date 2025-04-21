<script lang="ts">
  import IgnoredCheckbox from "./ignoredCheckbox.svelte";
  import ImportantCheckbox from "./importantCheckbox.svelte";
  import KnownCheckbox from "./knownCheckbox.svelte";
  import type { tokensTable } from "./server/db/schema";

  const { token, onUpdate } = $props<{
    token: typeof tokensTable.$inferSelect;
    onUpdate: {
      (updatedToken: typeof tokensTable.$inferSelect): void;
    };
  }>();
</script>

<div class="flex flex-col gap-4 items-center">
  <ruby class="text-5xl">
    {token.surface_form}
    <rt>{token.reading}</rt>
  </ruby>

  {#if !token.ignored}
    <KnownCheckbox {token} {onUpdate} />
    {#if !token.known}
      <ImportantCheckbox {token} {onUpdate} />
    {/if}
  {/if}
  {#if !token.known}
    <IgnoredCheckbox {token} {onUpdate} />
  {/if}
</div>
