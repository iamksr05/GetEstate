const toggleBtn = document.getElementById("themeToggle");
const html = document.documentElement;

toggleBtn.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");

  if (currentTheme === "light") {
    html.setAttribute("data-theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
  }
});