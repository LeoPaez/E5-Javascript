const productsCart = document.getElementById("cart");
const productsCartStorage = document.querySelector(".cart__main");

const btnOpenCart = document.getElementById("open");
const btnCloseCart = document.getElementById("close");
//contenedor de pizzas
const productsCont = document.querySelector(".pizzas__cards");
//contenedor de categorias
const categories = document.querySelector(".categories__cards");
//lista de categorias
const categoriesList = document.querySelectorAll(".card--category");
// overlay
const overlay = document.querySelector(".overlay");

//funcion para buscar en localStorage
let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
//funcion para guardar en localStorage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

console.log(cartStorage);

const renderProduct = (product) => {
  const { img, name, desc, price } = product;

  return `
    <div class="card card--pizza">
      <img class="card__img" src="${img}" alt="producto popular">
      <div class="card__container-info">
        <div class="card__info">
          <p class="card__name">${name}</p>
          <p class="card__description">${desc}</p>
          <p class="card__price gradient-text">$${price}</p>
        </div>
        <button class="btn">Agregar</button>
      </div>
    </div>
  `;
};

// Renderizar productos
const renderPopularProducts = () => {
  productsCont.innerHTML += mostPopularProducts()
    .map(renderProduct) // .map((e) => renderProduct(e))
    .join("");
};

const renderFilteredProducts = (category) => {
  const productsList = products.filter(
    (product) => product.category === category
  );
  productsCont.innerHTML = productsList.map(renderProduct).join("");
};

const renderProducts = (category = undefined) => {
  if (!category) {
    renderPopularProducts();
    return;
  }
  renderFilteredProducts(category);
};

// Filtros
const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  changeBtnActiveState(selectedCategory);
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const applyFilter = (e) => {
  console.log(e.target.dataset);
  if (!e.target.matches(".card--category, .card__icon, .card__name")) return;
  changeFilterState(e);
  if (!e.target.dataset.category) {
    productsCont.innerHTML = "";
    renderProducts();
  } else {
    renderProducts(e.target.dataset.category);
  }
  if (productsCont.innerHTML == "") {
    productsCont.innerHTML = "<p class='out-stock'>Sin Stock</p>";
  }
};

//abrir-cerrar carrito con overlay
const toggleCart = () => {
  productsCart.classList.toggle("is-active");
  overlay.classList.toggle("show-overlay");
};

//cerrar el carrito cuando scrolleamos
const closeOnScroll = () => {
  if (!productsCart.classList.contains("is-active")) return;
  productsCart.classList.remove("is-active");
  overlay.classList.remove("show-overlay");
};
//cerrar el carrito cuando hacemos click fuera del carrito
const closeOnOverlayClick = () => {
  productsCart.classList.remove("is-active");
  overlay.classList.remove("show-overlay");
};
//funciones del carrito
const renderCartProduct = (cartProduct) => {
  const { img, name, desc, price, quantity } = cartProduct;
  return `    
      <div class="card card--cart box-shadow">
          <img
            class="card__img"
            src="${img}"
            alt="pizza recomendada"/>
          <div class="card__info">
            <p class="card__name">${name}</p>
            <p class="card__description">${desc}</p>
            <p class="card__price gradient-text">$${price}</p>
          </div>
          <div class="card__buttons">
            <button class="btn btn--cart down data-id=${id}">-</button>
            <span class="card__quantity">${quantity}</span>
            <button class="btn btn--cart up data-id=${id}">+</button>
          </div>
        </div>
        `;
};

const renderCart = () => {
  // si el carrito esta vacio muestra un msg
  if (!productsCartStorage.length) {
    productsCartStorage.innerHTML = `<p class="empty-msg"> No hay productos en el carrito. </p>`;
    return;
  }
  // renderiza los productos que hay
  productsCartStorage.innerHTML = cart.map(renderCartProduct).join("");
};
//funcion para para conseguir el total entre todos los productos del carrito
const getCartTotal = () => {
  return cartStorage.reduce(
    (acc, cur) => acc + Number(cur.price) * Number(cur.quantity),
    0
  );
};

const init = () => {
  renderProducts();
  //Aplicar filtro
  categories.addEventListener("click", applyFilter);
  //Carrito
  btnOpenCart.addEventListener("click", toggleCart);
  btnCloseCart.addEventListener("click", toggleCart);
  window.addEventListener("scroll", closeOnScroll);
  overlay.addEventListener("click", closeOnOverlayClick);
  /*
  btnOpenCart.addEventListener("click", () => {
    productsCart.classList.add("is-active");
  });
  btnCloseCart.addEventListener("click", () => {
    productsCart.classList.remove("is-active");
  });*/
};

window.addEventListener("DOMContentLoaded", init);
