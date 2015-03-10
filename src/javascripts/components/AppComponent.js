var React = require('react');

var Shop = require('./ShopComponent');
var Cart = require('./CartComponent');

var CartStore = require('../stores/CartStore');

var AppComponent = React.createClass({
  getInitialState() {
    return { cart: [] }
  },

  componentWillMount() {
    CartStore.addChangeListener(this.updateState);
  },

  componentWillUnmount() {
    CartStore.removeChangeListener(this.updateState);
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
