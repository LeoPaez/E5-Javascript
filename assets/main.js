//Carrito
const productsCart = document.getElementById("cart");
//Productos del carrito
const productsCartStorage = document.querySelector(".cart__main");
//Boton abrir carrito
const btnOpenCart = document.getElementById("open");
//Boton cerrar carrito
const btnCloseCart = document.getElementById("close");
//Contenedor de pizzas
const productsCont = document.querySelector(".pizzas__cards");
//Contenedor de pizzas recomendadas
const recommendsCont = document.querySelector(".recommended__cards");
//Contenedor de categorias
const categories = document.querySelector(".categories__cards");
//Lista de categorias
const categoriesList = document.querySelectorAll(".card--category");
//Overlay
const overlay = document.querySelector(".overlay");
//Selecciono btn-buy
const btnBuy = document.querySelector(".btn-buy");
//Selecciono btn-delete
const btnDelete = document.querySelector(".btn-delete");
//El total en precio del carrito
const total = document.querySelector(".total");
// Modal de agregado al carrito.
const successModal = document.querySelector(".add-modal");


//Funcion para buscar en localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Funcion para guardar en localStorage
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};


//Renderizar producto recomendado
const renderRecommendedProduct = (product) => {
  const { img, name, desc, price, id } = product;

  return `
    <div class="card-recommended box-shadow">
      <img class="card__img--recommended" src="${img}" alt="producto popular">
      <div class="card__info">
          <p class="card__name">${name}</p>
          <p class="card__description">${desc}</p>
          <p class="card__price gradient-text">$ ${price}</p>
      </div>
        <button class="btn btn-add" data-id='${id}' data-name='${name}' data-price='${price}' data-img='${img}' data-desc='${desc}'>Agregar</button>
      </div>
    </div>
  `;
};

//Renderizar productos recomendados
const renderRecommendedProducts = () => {
  const recommendedProducts = products.filter(
    (product) => product.recommended === true
  );
  recommendsCont.innerHTML = recommendedProducts.map(renderRecommendedProduct).join("");
};


//Renderizar producto
const renderProduct = (product) => {
  const { img, name, desc, price, id } = product;

  return `
    <div class="card card--pizza">
      <img class="card__img" src="${img}" alt="producto popular">
      <div class="card__container-info">
        <div class="card__info">
          <p class="card__name">${name}</p>
          <p class="card__description">${desc}</p>
          <p class="card__price gradient-text">$ ${price}</p>
        </div>
        <button class="btn btn-add" data-id='${id}' data-name='${name}' data-price='${price}' data-img='${img}' data-desc='${desc}'>Agregar</button>
      </div>
    </div>
  `;
};

//Renderizar productos
const renderProducts = (category = undefined) => {
  if (!category) {
    renderPopularProducts();
    return;
  }
  renderFilteredProducts(category);
};

// Renderizar productos populares
const renderPopularProducts = () => {
  productsCont.innerHTML += mostPopularProducts()
    .map(renderProduct) // .map((e) => renderProduct(e))
    .join("");
};

//Renderizar productos filtrados
const renderFilteredProducts = (category) => {
  const productsList = products.filter(
    (product) => product.category === category
  );
  productsCont.innerHTML = productsList.map(renderProduct).join("");
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

// Carrito
//Abrir-cerrar carrito con overlay
const toggleCart = () => {
  productsCart.classList.toggle("is-active");
  overlay.classList.toggle("show-overlay");
};

//Cerrar el carrito cuando scrolleamos
const closeOnScroll = () => {
  if (!productsCart.classList.contains("is-active")) return;
  productsCart.classList.remove("is-active");
  overlay.classList.remove("show-overlay");
};

//Cerrar el carrito cuando hacemos click fuera del carrito
const closeOnOverlayClick = () => {
  productsCart.classList.remove("is-active");
  overlay.classList.remove("show-overlay");
};

//Funciones del carrito
const renderCartProduct = (cartProduct) => {
  const { id, img, name, desc, price, quantity } = cartProduct;
  return `    
      <div class="card card--cart box-shadow">
          <img
            class="card__img--cart"
            src="${img}"
            alt="pizza recomendada"/>
          <div class="card__info">
            <p class="card__name">${name}</p>
            <p class="card__description">${desc}</p>
            <p class="card__price gradient-text">$${price}</p>
          </div>
          <div class="card__buttons">
            <button class="btn btn--cart down" data-id="${id}">-</button>
            <span class="card__quantity">${quantity}</span>
            <button class="btn btn--cart up" data-id="${id}">+</button>
          </div>
        </div>
        `;
};

const renderCart = () => {
  // si el carrito esta vacio muestra un msg
  if (!cart.length) {
    productsCartStorage.innerHTML = `<p class="empty-msg"> No hay productos en el carrito. </p>`;
    return;
  }
  // renderiza los productos que hay
  productsCartStorage.innerHTML = cart.map(renderCartProduct).join("");
};

//Funcion para para conseguir el total entre todos los productos del carrito
const getCartTotal = () => {
  return cart.reduce((acc, cur) => {
    if (cur.price === "Gratis") {
      //Si el precio el 'gratis' suma 0 al total
      return acc + 0;
    } else {
      return acc + Number(cur.price) * Number(cur.quantity);
    }
  }, 0);
};

//Renderizar el total de los productos
const showTotal = () => {
  total.innerHTML = `${getCartTotal().toFixed(2)} $`;
};

//Funcion para deshabilitar los botones si no hay nada en el carrito
const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.remove("btn");
    btn.classList.add("disabled");
    return;
  }
  btn.classList.add("btn");
  btn.classList.remove("disabled");
};

//Funcion que se encarga de agregar un producto al carrito
const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const { id, price, img, name, desc } = e.target.dataset;
  const product = createProductObj(id, price, img, name, desc);
  
  
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
    showSuccessModal("Se agregó una unidad del producto al carrito");
  } else {
    createCartProduct(product);
    showSuccessModal("El producto se ha agregado al carrito");
  }
  checkCartState();
};

//Crea un objeto con la data del producto
const createProductObj = (id, price, img, name, desc) => {
  return { id, price, img, name, desc };
};

//Agrega el objeto del producto al carrito
const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

//Comprueba si el producto existe el carrito
const isExistingCartProduct = (product) => {
  return cart.find((itemCart) => itemCart.id === product.id);
};


//Funcion que reutiliza otras funciones necesarias en cada cambio del carrito
const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart();
  showTotal();
  disableBtn(btnBuy);
  disableBtn(btnDelete);
};

//Modal de agregado 
const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};

//Remover producto del carrito
const removeProductFromCart = (existingProduct) => {
  cart = cart.filter(product => product.id !== existingProduct.id)
  checkCartState()
}

//Aumenta la cantidad del producto en 1
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

//Disminuir la unidad del producto
const substractProductUnit = (existingProduct) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === existingProduct.id
      ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
      : cartProduct;
  });
};

//Si aumentamos la unidad del producto
const handlePlusBtnEvent = (id) => {
 
  const existingCartProduct = cart.find((item)=> item.id === id);
  addUnitToProduct(existingCartProduct); 
};

//Si disminuimos la unidad del producto
const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id)


  if(existingCartProduct.quantity === 1) {
    if (window.confirm("Desea eliminar el producto del carrito?")){
      removeProductFromCart(existingCartProduct);
    }
    return;
  } 
  substractProductUnit(existingCartProduct);
};

//Comprueba si estamos disminuyendo o sumando la unidad
const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  checkCartState();
};

const resetCartItems = () => {
  cart = [];
  checkCartState();
};

//Funcionalidad de los botones del carrito
const completeCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

//Completar compra
const completeBuy = () => {
  completeCartAction(
    "¿Desea completar su compra?",
    "La compra se ha realizado correctamente"
  );
};

//Vaciar carrito
const deleteCart = () => {
  completeCartAction(
    "¿Está seguro de que desea vaciar el carrito?",
    "Tu carrito está vacio"
  );
};

const init = () => {
  renderProducts();
  categories.addEventListener("click", applyFilter);
  btnOpenCart.addEventListener("click", toggleCart);
  btnCloseCart.addEventListener("click", toggleCart);
  window.addEventListener("scroll", closeOnScroll);
  overlay.addEventListener("click", closeOnOverlayClick);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showTotal);
  document.addEventListener("DOMContentLoaded", renderRecommendedProducts);
  document.addEventListener("click", addProduct);
  productsCart.addEventListener("click", handleQuantity)
  btnBuy.addEventListener("click", completeBuy)
  btnDelete.addEventListener("click", deleteCart)
  disableBtn(btnDelete);
  disableBtn(btnBuy);
  
  /*
  btnOpenCart.addEventListener("click", () => {
    productsCart.classList.add("is-active");
  });
  btnCloseCart.addEventListener("click", () => {
    productsCart.classList.remove("is-active");
  });*/
};

init();
