<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  const { searchParams, pathname } = page.url;

  const key = "search";
  let search = searchParams.get(key) || "";

  function handleSubmit(e: Event) {
    e.preventDefault();

    if (search) searchParams.set(key, search);
    else searchParams.delete(key);

    goto(`${pathname}?${searchParams.toString()}`);
  }
</script>

<form onsubmit={handleSubmit} class="flex gap-2">
  <input type="text" bind:value={search} class="input" />
  <input type="submit" class="btn" value="Search" />
</form>
