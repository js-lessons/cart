var React = require('react');
var CartProduct = require('./CartProductComponent');

var CartComponent = React.createClass({
  render: function() {
    var productNodes = this.props.cart.map(function(product, index) {
      return (
        <CartProduct
          changeQuantityHandler={this.props.changeQuantityHandler}
          removeFromCartHandler={this.props.removeFromCartHanler}
          product={product}
          key={index} />
      );
    }.bind(this));

    var total = this.props.cart.reduce(function(sum, product) {
      return sum += product.price * product.quantity;
    }, 0);

    return (
      <div className="cart">
        <h1>Your order</h1>
        {productNodes}
        <div className="row">
          <div className="total col-md-3">
            Total: <span className="total-amount">${total}</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CartComponent;
