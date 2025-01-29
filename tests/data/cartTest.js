import { cart } from '../../data/cart-class.js';

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    const mockQuantitySelector = { value: '1' }; // mock the value of the quantity
    spyOn(document, 'querySelector').and.returnValue(mockQuantitySelector);

    spyOn(localStorage, 'setItem');


    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem');

    // Mock the quantity selector (simulating the DOM element with a value)
    const mockQuantitySelector = { value: '1' }; // mock the value of the quantity
    spyOn(document, 'querySelector').and.returnValue(mockQuantitySelector);

    cart.cartItems = [];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
  });
});