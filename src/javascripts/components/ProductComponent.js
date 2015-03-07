var React = require('react');

var ProductComponent = React.createClass({
  addToCart: function(e) {
    e.preventDefault();
    this.props.addToCartHandler(this.props.product.code);
  },

  render: function() {
    return (
      <a href="#" className="col-md-4" onClick={this.addToCart}>
        <img src={this.props.product.img} alt={this.props.product.title} />
      </a>
    );
  }
})

module.exports = ProductComponent;
