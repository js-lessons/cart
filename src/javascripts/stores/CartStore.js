require('array.prototype.find');

var extend = require('underscore').extend;
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatchers/AppDispatcher');
var CartConstants = require('../constants/CartConstants');
var CartActions = require('../actions/CartActions');

var PRODUCTS = require('../data/products');
var CHANGE_EVENT = CartConstants.CHANGE;

var _cartProducts = [];


function _receiveCartData(data) {
  _cartProducts = data;
}


function _cartAdd(code) {
  var cartProduct;

  var product = PRODUCTS.filter(function(product) {
    return product.code === code;
  })[0];

  if (CartStore.isInCart(product)) {
    cartProduct = CartStore.getProduct(code);
    cartProduct.quantity++;
  } else {
    cartProduct = extend({}, product, { quantity: 1 });
    _cartProducts.push(cartProduct);
  }
}


function _cartRemove(code) {
  var cartProduct = CartStore.getProduct(code);
  _cartProducts.splice(_cartProducts.indexOf(cartProduct), 1);
}


function _changeQuantity(code, quantity) {
  var cartProduct = CartStore.getProduct(code);
  cartProduct.quantity = quantity;
}


var CartStore = extend({}, EventEmitter.prototype, {
  isInCart(product) {
    return _cartProducts.some(function(p) { return p.code == product.code });
  },

  getProducts() {
    return _cartProducts;
  },

  getProduct(code) {
    return _cartProducts.find(function(p) { return p.code == code });
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case CartConstants.RECEIVE_CART_DATA:
      _receiveCartData(action.data);
      break;

    case CartConstants.CART_ADD:
      _cartAdd(action.code);
      break;

    case CartConstants.CART_REMOVE:
      _cartRemove(action.code);
      break;

    case CartConstants.CART_CHANGE_QUANTITY:
      _changeQuantity(action.code, action.quantity);
      break;

    default:
      return true;
  }

  CartStore.emitChange();

  return true;
});

module.exports = CartStore;
