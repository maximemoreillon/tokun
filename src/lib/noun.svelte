<script lang="ts">
  import type { tokensTable } from "./server/db/schema";

  type Options = {
    highlightUnknown: boolean;
    highlightKnown: boolean;
    highlightIgnored: boolean;
  };
  const {
    token,
    onTokenClicked,
    options = {
      highlightUknown: true,
      highlightKnown: false,
      highlightIgnored: false,
    },
  } = $props<{
    token: typeof tokensTable.$inferSelect;
    onTokenClicked: () => void;
    options?: Options;
  }>();

  const getClass = () => {
    const classes = ["cursor-pointer"];

    if (options.highlightIgnored && token.ignored) {
      // classes.push("text-decoration-line");
      // classes.push("line-through");
      classes.push("text-gray-400");
    } else if (options.highlightUnknown && !token.known && !token.ignored) {
      classes.push("text-red-700");
      if (token.important) classes.push("font-bold");
    } else if (options.highlightKnown && token.known)
      classes.push("text-green-700");

    return classes.join(" ");
  };
</script>

<span
  class={getClass()}
  onclick={() => onTokenClicked()}
  onkeydown={() => {}}
  role="button"
  tabindex="0"
>
  {token.surface_form}
</span>
