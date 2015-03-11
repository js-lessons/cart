var React = require('react');
var CartProduct = require('./CartProductComponent');

var CartComponent = React.createClass({
  render() {
    var productNodes = this.props.cart.map((product, index) => {
      return <CartProduct product={product} key={index} />
    });

    var total = this.props.cart.reduce((sum, product) => {
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
