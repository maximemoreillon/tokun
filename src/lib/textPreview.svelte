<script lang="ts">
  import type { textsTable } from "./server/db/schema";

  export let text: typeof textsTable.$inferSelect;
</script>

<a
  href={`/texts/${text.id}`}
  class="block border-1 rounded p-2 w-full my-2"
  aria-label="text"
>
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

  <div class="mt-2 w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
    {text.content}
  </div>
</a>
