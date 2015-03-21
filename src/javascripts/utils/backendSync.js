import '../lib/Stuff';

import { extend } from 'underscore';
import PRODUCTS from '../data/products';

var CartStuff = Stuff('shopping_cart');

export default {
  fetch() {
    // circular deps workaround
    var actions = require('../actions/CartActions');

    var data = Stuff('shopping_cart').map(id => {
      var product = Stuff('shopping_cart').get(id);
      product.id = id;
      return product;
    });

    actions.receiveCartData(data);
  },


  add(code) {
    var cartProduct;

    var product = PRODUCTS.filter(product => {
      return product.code === code;
    })[0];

    var cartProductId = CartStuff.find(id => {
      return CartStuff.get(id).code === code;
    });

    if (cartProductId) {
      cartProduct = CartStuff.get(cartProductId);
      cartProduct.quantity++;
      CartStuff.update(cartProductId, cartProduct);
    } else {
      CartStuff.add(extend({}, product, { quantity: 1 }));
    }
  },


  remove(code) {
    CartStuff.remove(CartStuff.find(id => {
      return CartStuff.get(id).code === code;
    }));
  },


  changeQuantity(code, quantity) {
    var productId = CartStuff.find(id => {
      return CartStuff.get(id).code === code;
    });

    var product = CartStuff.get(productId);

    product.quantity = quantity;
    CartStuff.update(productId, product);
  },
}
