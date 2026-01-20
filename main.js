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
    const res = await fetch("../property-modal.html");
    const html = await res.text();
    document.body.insertAdjacentHTML("beforeend", html);
    dialog = document.getElementById("myDialog");
  }

  dialog.showModal();
}


function test() {
  const propTitle = document.getElementById("property-title").value;
  const propPrice = document.getElementById("prop-price").value;
  const propAdd = document.getElementById("prop-loc").value;
  const cardPropImage = document.getElementById("prop-photos").files[0];
  if (!cardPropImage) return;


  const imgURL = URL.createObjectURL(cardPropImage);

  const amt = Number(propPrice).toLocaleString("en-IN", {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  })


  const reader = new FileReader();

  reader.onload = () => {

    const data = {
      title: propTitle,
      price: propPrice,
      address: propAdd,
      image: reader.result
    };

    localStorage.setItem("propertyData", JSON.stringify(data));
  };
  reader.readAsDataURL(cardPropImage)

  const saved = localStorage.getItem("propertyData");

  if (saved) {
    const data = JSON.parse(saved);

  const propCard = `
  <a class="property-card" href="property pages/property1.html">
  <div class="pcard-image">
  <img src="${data.image}" alt="bungalow-image">
  </div>
  <div class="pcard-details">
  <div class="pcard-title">
  ${data.title}
  </div>
  <div class="pcard-price">
  <span>${data.price}</span>
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


  let cardGrid = document.getElementById("detail-cards");
  cardGrid.insertAdjacentHTML("beforeend", propCard);
}



  document.getElementById('myDialog').close()
}
