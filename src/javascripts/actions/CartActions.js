var AppDispatcher = require('../dispatchers/AppDispatcher');
var CartConstants = require('../constants/CartConstants');
var Backend = require('../utils/backendSync');

var CartActions = {
  receiveCartData(data) {
    AppDispatcher.handleAction({
      actionType: CartConstants.RECEIVE_CART_DATA,
      data: data
    })
  },

  addToCart(code) {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_ADD,
      code: code,
    })

    Backend.add(code);
  },

  removeFromCart(code) {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_REMOVE,
      code: code
    });

    Backend.remove(code);
  },

  changeQuantity(code, quantity) {
    AppDispatcher.handleAction({
      actionType: CartConstants.CART_CHANGE_QUANTITY,
      code: code,
      quantity: quantity
    });

    Backend.changeQuantity(code, quantity);
  }
};

module.exports = CartActions;
