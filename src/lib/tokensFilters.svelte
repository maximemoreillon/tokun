<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  const { searchParams, pathname } = page.url;

  function handleChanged(e: Event, key: string) {
    const target = e.target as HTMLSelectElement;

    const { value } = target;

    if (value) searchParams.set(key, value);
    else searchParams.delete(key);

    goto(`${pathname}?${searchParams.toString()}`);
  }
</script>

<div class="flex gap-4">
  <label>
    Importance
    <select
      class="select"
      onchange={(e) => {
        handleChanged(e, "important");
      }}
      value={searchParams.get("important")}
    >
      <option value="true">Important</option>
      <option value="false">Not important</option>
      <option value={null}>Any</option>
    </select>
  </label>

  <label>
    Known

    <select
      class="select"
      value={searchParams.get("known")}
      onchange={(e) => {
        handleChanged(e, "known");
      }}
    >
      <option value="true">Known</option>
      <option value="false">Unknown</option>
      <option value={null}>Any</option>
    </select>
  </label>
</div>
