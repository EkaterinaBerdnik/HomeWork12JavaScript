const data = JSON.parse(dataProducts);
const fiCatalogEl = document.querySelector(".fi_catalog");
const templateEl = document.querySelector(".template");
const btnViewAllEl = document.querySelector(".view_all");

let end = 6;
let start = 0;
const visibleCount = 3;
let counter = 0;
let itemCounter = 1;

showItems();

let addToCartBtn = document.querySelectorAll(".cart");
addItemToCart(addToCartBtn);

btnViewAllEl.addEventListener("click", function (e) {
  start = end;
  end = end + visibleCount;

  showItems();

  if (end >= data.length) {
    btnViewAllEl.classList.add("hide");
  }

  const newBtn = fiCatalogEl.querySelectorAll(".cart");
  const result = Array.from(newBtn).slice(start, end);
  addItemToCart(result);
});

function showItems() {
  const dataSlice = data.slice(start, end);

  dataSlice.forEach((item) => {
    const fiCatalogItemEl = templateEl.content
      .querySelector(".fi_catalog_item")
      .cloneNode(true);

    const cartEl = fiCatalogItemEl.querySelector(".cart");
    cartEl.dataset.id = item.id;

    const imgEl = fiCatalogItemEl.querySelector(".fi_catalog_image");
    imgEl.src = item.img;

    const itemNameEl = fiCatalogItemEl.querySelector(".item_name");
    itemNameEl.textContent = item.name;

    const descriptionEl = fiCatalogItemEl.querySelector(".description");
    descriptionEl.textContent = item.description;

    const priceEl = fiCatalogItemEl.querySelector(".price");
    priceEl.textContent = item.price;

    fiCatalogEl.appendChild(fiCatalogItemEl);
  });
}

const countBlock = document.querySelector(".count_block");
let cartCounter = document.querySelector(".cart_num");
const cartItemsBlock = document.querySelector(".cart_items");
const cartTopEl = document.querySelector(".cart_top");

function addItemToCart(buttons) {
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      cartItemsBlock.classList.remove("hide");
      countBlock.classList.remove("hide");

      counter++;
      cartCounter.textContent = counter;

      addAndDeleteCartItems(e);
    });
  });
}

function addAndDeleteCartItems(element) {

  const addedItems = document.querySelector(".added_items");

  const blockEl = document.createElement("div");
  blockEl.classList.add("block");

  const closeButtonEl = document.createElement("img");
  closeButtonEl.classList.add("close");
  closeButtonEl.src = "./img/Vector.png";

  const blockImageEl = document.createElement("div");
  blockImageEl.classList.add("block__image");

  const blockImage = document.createElement("img");
  blockImage.classList.add("added_item_image");
  blockImage.src = data[element.target.dataset.id].img;

  blockImageEl.appendChild(blockImage);

  const blockTextEl = document.createElement("div");
  blockTextEl.classList.add("block__text");

  const nameEl = document.createElement("h1");
  nameEl.classList.add("added_item_name");
  nameEl.textContent = data[element.target.dataset.id].name;

  const priceEl = document.createElement("p");
  priceEl.classList.add("added_item_price");
  priceEl.textContent = "Price: ";

  const priceColorEl = document.createElement("span");
  priceColorEl.classList.add("color__red");
  priceColorEl.textContent = data[element.target.dataset.id].price;

  priceEl.appendChild(priceColorEl);

  const colorEl = document.createElement("p");
  colorEl.classList.add("added_item_color");
  colorEl.textContent = "Color: " + data[element.target.dataset.id].color;

  const sizeEl = document.createElement("p");
  sizeEl.classList.add("added_item_size");
  sizeEl.textContent = "Size: " + data[element.target.dataset.id].size;

  const quantityTextEl = document.createElement("p");
  quantityTextEl.classList.add("quantity");
  quantityTextEl.textContent = "Quantity: ";

  const quantityInputEl = document.createElement("input");
  quantityInputEl.classList.add("added_item_input");
  quantityInputEl.type = "number";
  quantityInputEl.value = itemCounter;

  quantityTextEl.appendChild(quantityInputEl);

  blockTextEl.appendChild(nameEl);
  blockTextEl.appendChild(priceEl);
  blockTextEl.appendChild(colorEl);
  blockTextEl.appendChild(sizeEl);
  blockTextEl.appendChild(quantityTextEl);

  blockEl.appendChild(closeButtonEl);
  blockEl.appendChild(blockImageEl);
  blockEl.appendChild(blockTextEl);

  addedItems.appendChild(blockEl);

  const closeButton = blockEl.querySelector(".close");
  closeButton.addEventListener("click", function (e) {
    blockEl.classList.add("hide");
    counter--;
    cartCounter.textContent = counter;

    if (counter == 0) {
      cartItemsBlock.classList.add("hide");
    }
  });
}