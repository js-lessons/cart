var React = require('react');

var CartProductComponent = React.createClass({
  removeFromCart(e) {
    e.preventDefault();
    this.props.removeFromCartHandler(this.props.product.id);
  },

  changeQuantity(e) {
    var value = parseInt(e.target.value);
    this.props.changeQuantityHandler(this.props.product.id, value);
  },

  render() {
    return (
      <div className="row product">
        <img className="col-md-3" src={this.props.product.img} alt={this.props.product.title} />
        <div className="col-md-5">
          <h3>{this.props.product.title}</h3>
          <p>{this.props.product.description}</p>
        </div>

        <div className="price col-md-2">
          ${this.props.product.price}
        </div>
        <div className="col-md-1">
          <input onChange={this.changeQuantity} type="number" min="1" className="form-control" value={this.props.product.quantity}/>
        </div>
        <a href="#" onClick={this.removeFromCart} className="delete fui-cross"></a>
      </div>
    );
  }
});

module.exports = CartProductComponent;
