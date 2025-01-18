import { cart, removeFromCart, calculateCartQuantity, updateQuanity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartSummaryHTML = '';
let totalItemHeader = document.querySelector('.js-total-items-header');

cart.forEach((cartItem) => {
  const { productId } = cartItem;

  let matchingProduct = products.find(product => product.id === productId);

  cartSummaryHTML +=
    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update 
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="js-save-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct)}
        </div>
      </div>
    </div>`;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
    updateCartQuanity();
  });
});

function updateCartQuanity() {
  const cartQuantity = calculateCartQuantity();
  totalItemHeader.innerHTML = `${cartQuantity} items`;
  if (cartQuantity === 0) {
    totalItemHeader.innerHTML = '';
  }
}

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    container.classList.remove('is-editing-quantity');

    const newQuantity = Number(quantityInput.value);
    if (newQuantity > 0 && newQuantity < 100) {
      updateQuanity(productId, newQuantity);
      const quantityLabel = document.querySelector(`
        .js-quantity-label-${productId}`
      );

      quantityLabel.innerHTML = newQuantity;

      updateCartQuanity();

      quantityInput.value = '';
    } else {
      alert(`Please enter a valid quantity.\nQuantity must be higher than 0, and less than 100.`);
    }
  });
});

function deliveryOptionsHTML(matchingProduct) {
  return deliveryOptions.map((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0
      ? 'Free'
      : `$${formatCurrency(deliveryOption.priceCents)} - `;

    return `
      <div class="delivery-option">
        <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
  }).join('');
}

updateCartQuanity();
