<script lang="ts">
  import type { tokensTable } from "./server/db/schema";

  type Options = {
    highlightUnknown: boolean;
    highlightKnown: boolean;
  };
  const {
    token,
    onTokenClicked,
    options = { highlightUknown: true, highlightKnown: false },
  } = $props<{
    token: typeof tokensTable.$inferSelect;
    onTokenClicked: () => void;
    options?: Options;
  }>();

  const getClass = () => {
    const classes = ["cursor-pointer"];

    if (options.highlightUnknown && !token.known && !token.ignored)
      classes.push("text-red-700");
    else if (options.highlightKnown && token.known)
      classes.push("text-green-700");

    return classes.join(" ");
  };
</script>

<span class={getClass()} onclick={() => onTokenClicked()} onkeydown={() => {}}>
  {token.surface_form}
</span>
