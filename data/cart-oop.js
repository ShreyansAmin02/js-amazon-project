export let cart = {
  cartItems: undefined,
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem('cart'));

    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]; // default cart
    }
  }

};


loadFromStorage();



function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem = '';

  // uncomment this later
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`); // select the quantity from 1-10
  const quantity = Number(quantitySelector.value); // transfer to variable
  quantitySelector.value = 1; // reset to 1

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) { // check if item already exists in the cart
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity; // increase quantity if the product already exists in the cart
  } else {
    cart.push({ // add the product and quantity to the cart array
      productId,
      quantity,
      deliveryOptionId: '1' // default option 1
    });
  }
  saveToStorage();
};

export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}

export function calculateCartQuantity() {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  })
  return totalQuantity;
}

export function updateQuanity(productId, newQuantity) {
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);
  if (matchingItem) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {

  let matchingItem = '';

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) { // check if item already exists in the cart
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
