import 'array.prototype.find';

import Reflux from 'reflux';
import { extend } from 'underscore';
import actions from '../actions/CartActions';
import PRODUCTS from '../data/products';

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

    var product = PRODUCTS.filter(product => product.code === code)[0];

    if (this.isInCart(product)) {
      cartProduct = this.getProduct(code);
      cartProduct.quantity++;
    } else {
      cartProduct = extend({}, product, { quantity: 1 });
      this._cartProducts.push(cartProduct);
    }

    this.triggerChange();
  },

  onRemoveFromCart(code) {
    var cartProduct = this.getProduct(code);
    this._cartProducts.splice(this._cartProducts.indexOf(cartProduct), 1);
    this.triggerChange();
  },

  onChangeQuantity(code, quantity) {
    var cartProduct = this.getProduct(code);
    cartProduct.quantity = quantity;
    this.triggerChange();
  },

  isInCart(product) {
    return this._cartProducts.some(p => p.code == product.code);
  },

  getProduct(code) {
    return this._cartProducts.find(p => p.code == code);
  }
});

export default CartStore;
