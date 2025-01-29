import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

import { renderOrderSummary } from "./checkout/orderSummary.js";

import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProducts } from "../data/products.js";

import { loadCart } from "../data/cart.js";

// import '../data/backend-practice.js';

import '../data/cart-class.js';

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1'); // first load products, then 
    });

  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })

]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1'); // first load products, then 
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
  // load the page elements 

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });

});
*/