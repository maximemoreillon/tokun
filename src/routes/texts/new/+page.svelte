<script lang="ts">
  import { goto } from "$app/navigation";
  import ReturnLink from "$lib/returnLink.svelte";

  let content: string = ``;
  let loading = false;

  async function handleClick() {
    loading = true;
    const response = await fetch("/api/texts", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const { id } = await response.json();

    goto(`/texts/${id}`);
    loading = false;
  }
</script>

<ReturnLink />

<div class="flex justify-between my-4">
  <h2 class="text-2xl">Register new text</h2>
</div>

<textarea bind:value={content} class="w-full textarea min-h-100"></textarea>

<div class="my-4 flex justify-center">
  <button
    on:click={() => handleClick()}
    class="btn btn-primary"
    disabled={loading}
  >
    {loading ? "Loading..." : "Register"}
  </button>
</div>
