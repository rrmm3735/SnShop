const buyButtons = document.querySelectorAll('.buy-btn');
const cart = document.querySelector('.cart');
const cartCount = document.querySelector('.cart-count');

let products = [
  {
    id: 1,
    title: 'Nike Air Force 1',
    price: 150,
    image: './img/af1.jpg',
    count: 0
  },
  {
    id: 2,
    title: 'Adidas Yeezy Boost 350',
    price: 220,
    image: './img/yeezy.jpg',
    count: 0
  },
  {
    id: 3,
    title: 'Jordan 1 Retro High',
    price: 170,
    image: './img/jordan.jpg',
    count: 0
  }
];

function addToCart(product) {
  let cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');

  cartItem.innerHTML = `
    <div class="cart-item-info">
      <img class="cart-item-img" src="${product.image}" alt="${product.title}">
      <h3 class="cart-item-title">${product.title}</h3>
    </div>
    <div class="cart-item-count">
      <button class="cart-item-btn cart-item-btn-minus" data-id="${product.id}">-</button>
      <span class="cart-item-count-text">${product.count}</span>
      <button class="cart-item-btn cart-item-btn-plus" data-id="${product.id}">+</button>
    </div>
    <div class="cart-item-price">${product.price}$</div>
    <button class="cart-item-delete" data-id="${product.id}">x</button>
  `;

  cart.append(cartItem);
}

function updateCart() {
  let totalCount = 0;
  products.forEach((product) => {
    totalCount += product.count;
  });
  cartCount.textContent = totalCount;
}

buyButtons.forEach((buyButton) => {
  buyButton.addEventListener('click', () => {
    const productId = +buyButton.dataset.id;
    const product = products.find((p) => p.id === productId);

    if (product) {
      product.count++;
      addToCart(product);
      updateCart();
    }
  });
});

cart.addEventListener('click', (event) => {
  if (event.target.classList.contains('cart-item-btn-plus')) {
    const productId = +event.target.dataset.id;
    const product = products.find((p) => p.id === productId);
    product.count++;
    const cartItem = event.target.closest('.cart-item');
    const cartItemCount = cartItem.querySelector('.cart-item-count-text');
    cartItemCount.textContent = product.count;
    updateCart();
  } else if (event.target.classList.contains('cart-item-btn-minus')) {
    const productId = +event.target.dataset.id;
    const product = products.find((p) => p.id === productId);
    if (product.count > 0) {
      product.count--;
      const cartItem = event.target.closest('.cart-item');
      const cartItemCount = cartItem.querySelector('.cart-item-count-text');
      cartItemCount.textContent = product.count;
      updateCart();
    }
  } else if (event.target.classList.contains('cart-item-delete')) {
    const productId = +event.target.dataset.id;
