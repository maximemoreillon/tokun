<script lang="ts">
  function loadThemeFromLocalSorage() {
    const html = document.querySelector("html");
    if (!html) return;
    const theme = localStorage.getItem("theme");
    html.setAttribute("data-theme", theme || "light");
  }

  function changeTheme() {
    const html = document.querySelector("html");
    if (!html) return;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  loadThemeFromLocalSorage();
</script>

<button onclick={changeTheme} class="cursor-pointer text-2xl">
  🌓︎
  <!-- <img src="/dark-theme.svg" class="w-7" /> -->
</button>
