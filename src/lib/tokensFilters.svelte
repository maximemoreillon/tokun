<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  const { searchParams, pathname } = page.url;

  function handleChanged(e: Event, key: string) {
    const target = e.target as HTMLSelectElement;

    const importance = target.value;

    if (importance)
      searchParams.set(key, importance === "true" ? "true" : "false");
    else searchParams.delete(key);

    goto(`${pathname}?${searchParams.toString()}`);
  }
</script>

<div>
  <label>
    Importance:
    <select
      onchange={(e) => {
        handleChanged(e, "important");
      }}
      value={searchParams.get("importance")}
    >
      <option value="true">Important</option>
      <option value="false">Not important</option>
      <option value={null}>Any</option>
    </select>
  </label>

  <label>
    Known:

    <select
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
