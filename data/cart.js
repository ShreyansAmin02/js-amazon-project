export const cart = []; // empty cart


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
      quantity
    });
  }
}