/**
 * Represents a shopping cart.
 * @constructor
 * @param {string} localStorageKey - The key used to store the cart in localStorage.
 */
function Cart(localStorageKey) {
  const cart = {
    /**
     * The items in the cart.
     * @type {Array<{productId: string, quantity: number, deliveryOptionId: string}>}
     */
    cartItems: undefined,

    /**
     * Loads the cart items from localStorage.
     */
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

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

    /**
     * Saves the cart items to localStorage.
     */
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    /**
     * Adds a product to the cart.
     * @param {string} productId - The ID of the product to add.
     */
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
        this.cartItems.push({ // add the product and quantity to the cart array
          productId,
          quantity,
          deliveryOptionId: '1' // default option 1
        });
      }
      this.saveToStorage();
    },

    /**
     * Removes a product from the cart.
     * @param {string} productId - The ID of the product to remove.
     */
    removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
          newCart.push(cartItem);
        }
      });

      this.saveToStorage();
    },

    /**
     * Calculates the total quantity of items in the cart.
     * @returns {number} The total quantity of items in the cart.
     */
    calculateCartQuantity() {
      let totalQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
      })
      return totalQuantity;
    },

    /**
     * Updates the delivery option for a product in the cart.
     * @param {string} productId - The ID of the product to update.
     * @param {string} deliveryOptionId - The ID of the new delivery option.
     */
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

    /**
     * Updates the quantity of a product in the cart.
     * @param {string} productId - The ID of the product to update.
     * @param {number} newQuantity - The new quantity of the product.
     */
    updateQuanity(productId, newQuantity) {
      const matchingItem = this.cartItem.find(cartItem => cartItem.productId === productId);
      if (matchingItem) {
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
      }
    }
  };

  return cart;
}

const cart = Cart('cart-oop'); // loads and saves to localStorage wiht key 'cart-oop'

const businessCart = Cart('cart-business'); // loads and saves to localStorage wiht key 'cart-business'

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);