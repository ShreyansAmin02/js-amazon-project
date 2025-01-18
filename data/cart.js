export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }]; // default cart
}

function saveToStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem = '';

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`); // select the quanity from 1-10
  const quantity = Number(quantitySelector.value); // transfer to variable
  quantitySelector.value = 1; // reset to 1

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) { // check it item already exits in the cart
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity; // increase quantity if the product already exists in the cart
  } else {
    cart.push({ // add the product and quantity to the cart array
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage(cart);
};

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage(cart);
}