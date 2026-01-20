// const toggleBtn = document.getElementById("themeToggle");
// const html = document.documentElement;

// toggleBtn.addEventListener("click", () => {
//   const currentTheme = html.getAttribute("data-theme");

//   if (currentTheme === "light") {
//     html.setAttribute("data-theme", "dark");
//   } else {
//     html.setAttribute("data-theme", "light");
//   }
// });



async function openPropertyModal() {
  let dialog = document.getElementById("myDialog");

  if (!dialog) {
    const isSubPage = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/property%20pages/");
    const path = isSubPage ? "../property-modal.html" : "property-modal.html";
    const res = await fetch(path);
    const html = await res.text();
    document.body.insertAdjacentHTML("beforeend", html);
    dialog = document.getElementById("myDialog");
  }

  dialog.showModal();
}

function addCard(data) {
  const container = document.getElementById("detail-cards");
  if (!container) return; // ← THIS LINE FIXES EVERYTHING

  const formattedPrice = Number(data.price).toLocaleString("en-IN", {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  })

  const isSubPage = window.location.pathname.includes("/pages/") || window.location.pathname.includes("/property%20pages/");
  const linkPath = isSubPage ? "../property pages/property1.html" : "property pages/property1.html";

  container.insertAdjacentHTML(
    "beforeend",
    `
    <a class="property-card" href="${linkPath}">
  <div class="pcard-image">
  <img src="${data.image}" alt="bungalow-image">
  </div>
  <div class="pcard-details">
  <div class="pcard-title">
  ${data.title}
  </div>
  <div class="pcard-price">
  <span>${formattedPrice}</span>
  </div>
  <div class="pcard-add">
  <span>${data.address}</span>
  </div>
  <div class="pcard-prop-info">
  <div><img src="assets/images/bed.svg" height="20px"><span>3 Beds</span></div>
  <div><img src="assets/images/bath.svg" height="20px"><span>2 Bath</span></div>
  <div><img src="assets/images/area.svg" height="20px"><span>2,000 sqft</span></div>
  </div>
  </div>
  </a>
    `
  );
}
function test() {
  const title = document.getElementById("property-title").value;
  const price = document.getElementById("prop-price").value;
  const address = document.getElementById("prop-loc").value;
  const file = document.getElementById("prop-photos").files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const data = { title, price, address, image: reader.result };

    let list = JSON.parse(localStorage.getItem("propertyData"));
    if (!Array.isArray(list)) list = [];

    list.push(data);
    localStorage.setItem("propertyData", JSON.stringify(list));

    addCard(data);
  };

  reader.readAsDataURL(file);

  document.getElementById('myDialog').close()
}

window.onload = () => {
  const list = JSON.parse(localStorage.getItem("propertyData")) || [];
  list.forEach(addCard);
};