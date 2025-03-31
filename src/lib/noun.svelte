<script lang="ts">
  let dialog: HTMLDialogElement;
  export let token: Token;
</script>

<dialog
  bind:this={dialog}
  class="backdrop:bg-black/50 backdrop:backdrop-blur-md mx-auto my-8 p-4 max-w-xl w-full relative rounded-sm"
>
  <button
    class="absolute top-1 right-1"
    on:click={() => {
      dialog.close();
    }}
  >
    X
  </button>
  <div class="my-4">
    <ruby>
      {token.surface_form}
      <rt>{token.reading}</rt>
    </ruby>
  </div>
</dialog>

<button class="border-b-1" on:click={() => dialog.showModal()}>
  {token.surface_form}
</button>

<style>
</style>
