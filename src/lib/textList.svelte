<script lang="ts">
  import type { textsTable } from "./server/db/schema";

  export let texts: (typeof textsTable.$inferSelect)[];
</script>

<ul class="list">
  {#each texts as text}
    <li class="list-row">
      <a href={`/texts/${text.id}`} aria-label="text">
        <div class="text-xs">
          {new Date(text.timestamp).toLocaleDateString()}
        </div>

        <div class="mt-1 w-full truncate">
          {text.content}
        </div>
      </a>
    </li>
  {/each}
</ul>
