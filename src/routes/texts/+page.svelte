<script lang="ts">
  // import { tokenIsValid } from "$lib";
  import Pagination from "$lib/pagination.svelte";
  import ReturnLink from "$lib/returnLink.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<ReturnLink />

<div class="flex justify-between">
  <h2 class="text-2xl">Texts</h2>

  <a href="/texts/new" class="rounded py-1 px-2 bg-red-700 text-white">
    Register new text
  </a>
</div>

{#each data.items as text}
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

    <div
      class="mt-2 w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
    >
      {text.content}
    </div>
  </a>
{/each}

<Pagination offset={data.offset} limit={data.limit} total={data.total} />
