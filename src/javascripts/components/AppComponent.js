var React = require('react');

var Shop = require('./ShopComponent');
var Cart = require('./CartComponent');

var AppComponent = React.createClass({
  render: function() {
    return (
      <div className="app">
        <Shop products={this.props.products} />
        <Cart cart={this.props.cart}/>
      </div>
    );
  }
});

module.exports = AppComponent;
