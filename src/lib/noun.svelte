<script lang="ts">
  import type { tokensTable } from "./server/db/schema";

  const { token, onTokenClicked } = $props<{
    token: typeof tokensTable.$inferSelect;
    onTokenClicked: () => void;
  }>();
</script>

<span
  class={`cursor-pointer ${!token.known && !token.ignored && "text-red-700"}`}
  onclick={() => onTokenClicked()}
  onkeydown={() => {}}
>
  {token.surface_form}
</span>
