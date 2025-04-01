<script lang="ts">
  let content: string = `お世話になります。\n山田と申します`;

  async function handleClick() {
    const response = await fetch("/api/texts", {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const result = await response.json();
    console.log(result);
  }
</script>

<a href="/texts">← Return to texts</a>

<h2 class="text-2xl my-4">Register new text</h2>
<textarea bind:value={content} class="w-full border-1 p-2 rounded-sm" />

<div class="text-center my-2">
  <button on:click={() => handleClick()} class="border-1 rounded-sm px-2 py-1">
    Register
  </button>
</div>
