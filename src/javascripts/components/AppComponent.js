var React = require('react');
var Reflux = require('reflux');

var Shop = require('./ShopComponent');
var Cart = require('./CartComponent');
var CartStore = require('../stores/CartStore');

var AppComponent = React.createClass({
  mixins: [Reflux.connect(CartStore, 'cart')],

  getInitialState() {
    return { cart: [] }
  },

  render() {
    return (
      <div className="app">
        <Shop products={this.props.products} />
        <Cart cart={this.state.cart}/>
      </div>
    );
  }
});

module.exports = AppComponent;
