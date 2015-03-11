require('array.prototype.find');

var Reflux = require('reflux');
var extend = require('underscore').extend;
var actions = require('../actions/CartActions');
var PRODUCTS = require('../data/products');
var backend = require('../utils/backendSync');

var CartStore = Reflux.createStore({
  listenables: actions,

  init() {
    this._cartProducts = [];
  },

  triggerChange() {
    this.trigger(this._cartProducts);
  },

  onReceiveCartData(data) {
    this._cartProducts = data;

    this.triggerChange();
  },

  onAddToCart(code) {
    var cartProduct;

    var product = PRODUCTS.filter(product => {
      return product.code === code;
    })[0];

    if (this.isInCart(product)) {
      cartProduct = this.getProduct(code);
      cartProduct.quantity++;
    } else {
      cartProduct = extend({}, product, { quantity: 1 });
      this._cartProducts.push(cartProduct);
    }

    backend.add(code);

    this.triggerChange();
  },

  onRemoveFromCart(code) {
    var cartProduct = this.getProduct(code);
    this._cartProducts.splice(this._cartProducts.indexOf(cartProduct), 1);

    backend.remove(code);

    this.triggerChange();
  },

  onChangeQuantity(code, quantity) {
    var cartProduct = this.getProduct(code);
    cartProduct.quantity = quantity;

    backend.changeQuantity(code, quantity);

    this.triggerChange();
  },

  isInCart(product) {
    return this._cartProducts.some(p => { return p.code == product.code });
  },

  getProduct(code) {
    return this._cartProducts.find(p => { return p.code == code });
  }
});

module.exports = CartStore;
