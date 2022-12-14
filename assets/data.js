const products = [
  // Pizzas
  {
    id: 1,
    img: "img/la-mr-pit.png",
    name: "La Mr. Pit",
    desc: "Solo para expertos",
    price: 350,
    category: "pizzas",
  },
  {
    id: 2,
    img: "img/q-jamone.png",
    name: "¡Q'Jamone!",
    desc: "c/jamon crudo",
    price: 350,
    category: "pizzas",
  },
  {
    id: 3,
    img: "img/la-charly-garcia.png",
    name: "La Charly Garcia",
    desc: "BASTA",
    price: 380,
    category: "pizzas",
  },
  {
    id: 4,
    img: "img/la-maradona.png",
    name: "La Maradona",
    desc: "¡Eterna!",
    price: 450,
    category: "pizzas",
    
  },
  {
    id: 5,
    img: "img/picantovich.png",
    name: "Picantovich",
    desc: "Pica 2 veces",
    price: 750,
    category: "pizzas",
  },
  {
    id: 6,
    img: "img/la-hasbulla.png",
    name: "La Hasbulla",
    desc: "En honor al 1",
    price: 990,
    category: "pizzas",
  },
  {
    id: 7,
    img: "img/leo-messi.png",
    name: "Leo Messi",
    desc: "¡De pie señores!",
    price: 10,
    category: "pizzas",
  },
  {
    id: 8,
    img: "img/nick-gi.png",
    name: "Nick Gi",
    desc: "La que desaparece",
    price: "Gratis",
    category: "pizzas",
    recommended: true,
  },
  // Hamburguesas
  {
    id: 9,
    img: "img/cheese.jpg",
    name: "Doble-Cheese",
    desc: "¡Pedila triple!",
    price: 300,
    category: "hamburguesas",
  },
  {
    id: 10,
    img: "img/bacon.jpg",
    name: "Mega Bacon",
    desc: "¡Ahora con más!",
    price: 380,
    category: "hamburguesas",
    recommended: true,
  },
  {
    id: 11,
    img: "img/americana.jpg",
    name: "Americana",
    desc: "La clásica",
    price: 350,
    category: "hamburguesas",
  },
  {
    id: 12,
    img: "img/vegan-burger.jpg",
    name: "Vegana",
    desc: "Puede contener carne",
    price: 400,
    category: "hamburguesas",
  },
  // Napapuki
  {
    id: 13,
    img: "img/Papas-fritas.webp",
    name: "Porcion de Papas",
    desc: "Abundante",
    price: 200,
    category: "napapuki",
  },
  {
    id: 14,
    img: "img/papas-god.jpg",
    name: "Papas God",
    desc: "Las mejores",
    price: 300,
    category: "napapuki",
    recommended: true,
  },
  {
    id: 15,
    img: "img/papas-a-caballo.jpg",
    name: "Papas a Caballo",
    desc: "¡Argentina papá!",
    price: 260,
    category: "napapuki",
  },
  {
    id: 16,
    img: "img/papas-bravas.jpg",
    name: "Papas bravas",
    desc: "Al mejor estilo",
    price: 320,
    category: "napapuki",
  },
  // Wraps
  {
    id: 17,
    img: "img/wrap-carne.jpg",
    name: "Wrap de Carne",
    desc: "Rellenito",
    price: 380,
    category: "wraps",
  },
  {
    id: 18,
    img: "img/wrap-pollo.jpg",
    name: "Wrap de Pollo",
    desc: "Mediterraneo",
    price: 380,
    category: "wraps",
  },
  {
    id: 19,
    img: "img/wrap-vegano.jpeg",
    name: "Wrap Vegano",
    desc: "Puede contener carne",
    price: 340,
    category: "wraps",
  },
  // Mexican Food (NO HAY STOCK)
  // Batidos
  {
    id: 20,
    img: "img/batido-chocolate.jpg",
    name: "Batido Chocolate",
    desc: "Muy chocolatoso",
    price: 250,
    category: "batidos",
  },
  {
    id: 21,
    img: "img/batido-vainilla.jpg",
    name: "Batido Vainilla",
    desc: "Con crema",
    price: 250,
    category: "batidos",
  },
];

const mostPopularProducts = () => {
  const popularProducts = [];
  for (let i = 0; i < 16; i++) {
    if (i % 2 == 0) {
      popularProducts.push(products[i]);
    }
  }
  return popularProducts;
};