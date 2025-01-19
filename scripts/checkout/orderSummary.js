import { cart, removeFromCart, updateQuanity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

import { deliveryOptions, getDeliveryOptions, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';



export function renderOrderSummary() {
  let cartSummaryHTML = '';
  // let totalItemHeader = document.querySelector('.js-total-items-header');

  cart.forEach((cartItem) => {
    const { productId } = cartItem;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptions(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML +=
      `<div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id} js-cart-item-container">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
          <div class="product-quantity 
          js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update 
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="js-save-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
            <span class="
            delete-quantity-link link-primary 
            js-delete-link
            js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>`;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      renderPaymentSummary();
      renderOrderSummary();
      renderCheckoutHeader();
    });
  });

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
      if (newQuantity < 100 && newQuantity > 0) {
        updateQuanity(productId, newQuantity);
        const quantityLabel = document
          .querySelector(`.js-quantity-label-${productId}`
          );
        quantityLabel.innerHTML = newQuantity;
        quantityInput.value = '';
      }
      else if (newQuantity === 0) {
        removeFromCart(productId);
      }
      else {
        alert(`Please enter a valid quantity.\nQuantity must be less than 100.`);
      }

      renderPaymentSummary();
      renderOrderSummary();
      renderCheckoutHeader();
    });
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.
          priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
      data-delivery-option-id='${deliveryOption.id}'>
        <input type="radio"
        ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
    });
    return html;
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId } = element.dataset;
        const { deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary(); // function is re running itself
        renderPaymentSummary();
      })
    })
};
