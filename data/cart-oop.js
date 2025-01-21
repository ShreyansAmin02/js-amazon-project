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
  },
  saveToStorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
  },

  addToCart(productId) {
    let matchingItem = '';

    // uncomment this later
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`); // select the quantity from 1-10
    const quantity = Number(quantitySelector.value); // transfer to variable
    quantitySelector.value = 1; // reset to 1

    this.cartItems.forEach((cartItem) => {
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
    this.saveToStorage();
  },

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (productId !== cartItem.productId) {
        newCart.push(cartItem);
      }
    });

    this.saveToStorage();
  },

  calculateCartQuantity() {
    let totalQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;
    })
    return totalQuantity;
  },

  updateDeliveryOption(productId, deliveryOptionId) {

    let matchingItem = '';

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) { // check if item already exists in the cart
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  },

  updateQuanity(productId, newQuantity) {
    const matchingItem = this.cartItem.find(cartItem => cartItem.productId === productId);
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  }

};

loadFromStorage();









