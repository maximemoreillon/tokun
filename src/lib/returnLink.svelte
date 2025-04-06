<script lang="ts">
  import { page } from "$app/state";

  const { pathname } = page.url;

  const splitPathname = pathname.split("/").slice(1);
  splitPathname.pop();
</script>

<a href={`/${splitPathname.join("/")}`}>← Return</a>
