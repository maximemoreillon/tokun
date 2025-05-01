<script lang="ts">
  import { browser } from "$app/environment";
  import { Moon, Sun } from "@lucide/svelte";

  // TODO: would be nice to get those from DaisyUI directly
  const themes = {
    light: "wireframe",
    dark: "black",
  };

  let theme = themes.light;

  function loadThemeFromLocalSorage() {
    if (!browser) return;
    const html = document.querySelector("html");
    if (!html) return;
    theme = localStorage.getItem("theme") || themes.light;
    html.setAttribute("data-theme", theme);
  }

  function changeTheme() {
    const html = document.querySelector("html");
    if (!html) return;
    const currentTheme = html.getAttribute("data-theme");
    theme = currentTheme === themes.dark ? themes.light : themes.dark;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  loadThemeFromLocalSorage();
</script>

<label class="swap swap-rotate">
  <!-- this hidden checkbox controls the state -->
  <input
    type="checkbox"
    class="theme-controller"
    checked={theme === themes.dark}
    onchange={() => changeTheme()}
  />

  <Moon class="swap-off" />
  <Sun class="swap-on" />
</label>
