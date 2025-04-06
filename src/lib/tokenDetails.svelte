<script lang="ts">
  import IgnoredCheckbox from "./ignoredCheckbox.svelte";
  import KnownCheckbox from "./knownCheckbox.svelte";
  import type { tokensTable } from "./server/db/schema";

  const { token, onUpdate } = $props<{
    token: typeof tokensTable.$inferSelect;
    onUpdate?: {
      (updatedToken: typeof tokensTable.$inferSelect): void;
    };
  }>();
</script>

<div class="flex flex-col gap-4">
  <ruby class="text-3xl">
    {token.surface_form}
    <rt>{token.reading}</rt>
  </ruby>

  {#if !token.ignored}
    <KnownCheckbox {token} {onUpdate} />
  {/if}
  <IgnoredCheckbox {token} {onUpdate} />
</div>
