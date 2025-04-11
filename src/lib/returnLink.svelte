<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/state";

  const { pathname } = page.url;
  const splitPathname = pathname.split("/").slice(1);
  splitPathname.pop();
  let href = `/${splitPathname.join("/")}`;

  afterNavigate(({ from }) => {
    if (!from) return;
    const { pathname, search } = from.url;
    if (pathname === href) href += search;
  });
</script>

<a {href}>← Return</a>
