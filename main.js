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



async function openPropertyModal() {
  let dialog = document.getElementById("myDialog");

  if (!dialog) {
    const res = await fetch("../property-modal.html");
    const html = await res.text();
    document.body.insertAdjacentHTML("beforeend", html);
    dialog = document.getElementById("myDialog");
  }

  dialog.showModal();
}