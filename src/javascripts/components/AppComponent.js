var React = require('react');

require("../lib/Stuff.js");

var Shop = require('./ShopComponent');
var Cart = require('./CartComponent');
var products = require('../data/products');

var CartStore = Stuff('shopping_cart');

var AppComponent = React.createClass({
  getInitialState() {
    return { cart: [] }
  },

  getCartState() {
    return CartStore.map(id => {
      var product = CartStore.get(id);
      product.id = id;
      return product;
    });
  },

  componentWillMount() {
    this.setState({
      cart: this.getCartState()
    });
  },

  removeFromCart(id) {
    CartStore.remove(id);

    this.setState({
      cart: this.getCartState()
    });
  },

  changeQuantity(id, quantity) {
    var product = CartStore.get(id);

    product.quantity = quantity;
    CartStore.update(id, product);

    this.setState({
      cart: this.getCartState()
    });
  },

  addToCart(code) {
    var cartProduct;
    var product = products.filter(function(product) {
      return product.code === code;
    })[0];

    var cartProductId = CartStore.find(function(id) {
      return CartStore.get(id).code === code;
    });

    if(cartProductId) {
      cartProduct = CartStore.get(cartProductId);
      cartProduct.quantity++;
      CartStore.update(cartProductId, cartProduct);
    } else {
      // Should clone this object
      product.quantity = 1;
      CartStore.add(product);
    }

    this.setState({
      cart: this.getCartState()
    });
  },

  render() {
    return (
      <div className="app">
        <Shop addToCartHandler={this.addToCart} products={this.props.products} />
        <Cart
          changeQuantityHandler={this.changeQuantity}
          removeFromCartHanler={this.removeFromCart}
          cart={this.state.cart}/>
      </div>
    );
  }
});

module.exports = AppComponent;
