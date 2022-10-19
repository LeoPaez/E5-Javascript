const productsCart = document.getElementById("cart");
const btnOpenCart = document.getElementById("open");
const btnCloseCart = document.getElementById("close");
const productsCont = document.querySelector(".pizzas__cards")
const categories = document.querySelector(".categories__cards")
const categoriesList = document.querySelectorAll(".card--category")

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
  if(productsCont.innerHTML == "") {
    productsCont.innerHTML = "<p class='out-stock'>Sin Stock</p>"
  }
};



const init = () => {
  renderProducts()
  //Aplicar filtro
  categories.addEventListener("click", applyFilter);
  //Carrito
  btnOpenCart.addEventListener("click", () => {
    productsCart.classList.add("is-active");
  });
  btnCloseCart.addEventListener("click", () => {
    productsCart.classList.remove("is-active");
  });
};

window.addEventListener("DOMContentLoaded", init);
