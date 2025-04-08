<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  const { searchParams, pathname } = page.url;

  function handleImportantChecked() {
    searchParams.set(
      "important",
      searchParams.get("important") === "true" ? "false" : "true"
    );

    goto(`${pathname}?${searchParams.toString()}`);
  }
</script>

<div>
  <label>
    <input type="checkbox" onchange={() => handleImportantChecked()} />
    Important
  </label>
</div>
