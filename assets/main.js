const cart = document.getElementById("cart");
const btnOpenCart = document.getElementById("open");
const btnCloseCart = document.getElementById("close");

const init = () => {
  //Carrito
  btnOpenCart.addEventListener("click", () => {
    cart.classList.add("is-active");
  });
  btnCloseCart.addEventListener("click", () => {
    cart.classList.remove("is-active");
  });
};

window.addEventListener("DOMContentLoaded", init);
