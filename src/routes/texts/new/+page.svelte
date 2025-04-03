<script lang="ts">
  import { goto } from "$app/navigation";

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

<a href="/texts">← Return to texts</a>

<div class="flex justify-between my-4">
  <h2 class="text-2xl">Register new text</h2>

  <button
    on:click={() => handleClick()}
    class="border-1 rounded-sm px-2 py-1"
    disabled={loading}
  >
    {loading ? "Loading..." : "Register"}
  </button>
</div>

<textarea bind:value={content} class="w-full border-1 p-2 rounded-sm min-h-100"
></textarea>
