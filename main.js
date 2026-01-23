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


function addCard(data) {
  const container = document.getElementById("detail-cards");
  if (!container) return;
  const formattedPrice = Number(data.price).toLocaleString("en-IN", {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  })

  const area = Number(data.area).toLocaleString("en-IN");


  container.insertAdjacentHTML(
    "beforeend",
    `
    <a class="property-card" href="../property pages/property1.html">
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
  <div class="pcard-house-type" id="pcard-house-type" style="display: none;">${data.propertyType}</div>
  <div class="pcard-add">
  <span>${data.address}</span>
  </div>
  <div class="pcard-prop-info">
  <div><img src="../assets/images/bed.svg" height="20px"><span>${data.bed} Beds</span></div>
  <div><img src="../assets/images/bath.svg" height="20px"><span>${data.bath} Bath</span></div>
  <div><img src="../assets/images/area.svg" height="20px"><span>${area} sq. ft.</span></div>
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
  const propertyType = document.getElementById("prop-type").value;

  const bed = document.getElementById("prop-beds").value;
  const bath = document.getElementById("prop-baths").value;
  const area = document.getElementById("prop-area").value;

  const file = document.getElementById("prop-photos").files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const data = { title, price, address, image: reader.result, bed, bath, area, propertyType };

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



function getNumber(text) {
  return Number(text.replace(/[^\d]/g, ""));
}

function parseRange(value) {
  if (value === "all") return null;
  if (value.includes("+")) return [Number(value.replace("+", "")), Infinity];
  return value.split("-").map(Number);
}


function filter() {
  const locationInput = document.getElementById("location-filter").value.toLowerCase().trim();
  const priceFilter = document.getElementById("price-filter").value;
  const areaFilter = document.getElementById("area-filter").value;

  const priceRange = parseRange(priceFilter);
  const areaRange = parseRange(areaFilter);




  const propType = document.getElementById("filter-select");
  const houseType = document.getElementsByClassName("pcard-house-type");
  const propCard = document.getElementsByClassName("property-card");
  const typeFilter = propType.value;

  for (let index = 0; index < houseType.length; index++) {
    const element = houseType[index];

    if (typeFilter == "all") {
      propCard[index].style.display = "";
    } else if (typeFilter != element.textContent) {
      propCard[index].style.display = "none";
    } else {
      propCard[index].style.display = "";
    }



    const priceText = propCard[index].querySelector(".pcard-price span").textContent;

    const areaText = propCard[index].querySelector(".pcard-prop-info div:last-child span").textContent;

    const price = getNumber(priceText);
    const area = getNumber(areaText);


    if (priceRange && (price < priceRange[0] || price > priceRange[1])) {
      propCard[index].style.display = "none";
      continue;
    }

    if (areaRange && (area < areaRange[0] || area > areaRange[1])) {
      propCard[index].style.display = "none";
      continue;
    }


    const addressText = propCard[index].querySelector(".pcard-add span").textContent.toLowerCase();

    if (locationInput && !addressText.includes(locationInput)) {
      propCard[index].style.display = "none";
      continue;
    }
  }

}
