<script lang="ts">
  import type { textsTable } from "./server/db/schema";

  export let text: typeof textsTable.$inferSelect;
</script>

<a
  href={`/texts/${text.id}`}
  class="block card card-border card-s"
  aria-label="text"
>
  <div class="card-body">
    <div class="flex justify-between">
      <div>
        {new Date(text.timestamp).toLocaleDateString()}
      </div>
      <!-- <div>
        <span class="text-red-700">
          {text.textTokens.filter(
            ({ token }: any) => tokenIsValid(token) && !token.known
            ).length}
            </span>
            /{text.textTokens.length}
      </div> -->
    </div>

    <div class="mt-1 w-full truncate">
      {text.content}
    </div>
  </div>
</a>
