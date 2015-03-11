var React = require('react');
var Reflux = require('reflux');

var Shop = require('./ShopComponent');
var Cart = require('./CartComponent');

var CartStore = require('../stores/CartStore');

var AppComponent = React.createClass({
  mixins: [Reflux.ListenerMixin],

  componentWillMount: function() {
    this.unsubscribe = this.listenTo(CartStore, this.updateState);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  getInitialState() {
    return { cart: [] }
  },

  updateState() {
    this.setState({ cart: CartStore.getProducts() });
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
