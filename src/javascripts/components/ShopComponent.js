var React = require('react');
var Product = require('./ProductComponent');

var ShopComponent = React.createClass({
  render() {
    var productNodes = this.props.products.map((product, index) => {
      return (
        <Product addToCartHandler={this.props.addToCartHandler} product={product} key={index} />
      );
    });

    return (
      <div className="shop">
        <h1>Shop</h1>
        <div className="row">
          {productNodes}
        </div>
      </div>
    );
  }
});

module.exports = ShopComponent;
