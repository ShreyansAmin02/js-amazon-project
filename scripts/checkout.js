import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

import { renderOrderSummary } from "./checkout/orderSummary.js";

import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProducts, loadProductsFetch } from "../data/products.js";

import { loadCart } from "../data/cart.js";

// import '../data/backend-practice.js';

import '../data/cart-class.js';

async function loadPage() {
  try {
    // throw 'error 1'; // this will manually create an error, skip the code, and go straight into the catch
    await loadProductsFetch(); // it will wait for this line to finish before going to the next line, await cna only be used within an async function

    const value = await new Promise((resolve, reject) => {
      // throw 'error2';
      loadCart(() => {
        // reject('error3');
        resolve('value2');
      });
    });

  } catch (error) {
    console.log(`An error occurred whilst loading the products:
${error}`);
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}
loadPage();

/*

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })

]).then((values) => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

*/

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