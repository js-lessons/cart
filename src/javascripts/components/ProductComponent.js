import React from 'react';
import actions from '../actions/CartActions';

var ProductComponent = React.createClass({
  addToCart(e) {
    e.preventDefault();
    actions.addToCart(this.props.product.code);
  },

  render() {
    return (
      <a href='#' className='col-md-4' onClick={this.addToCart}>
        <img src={this.props.product.img} alt={this.props.product.title} />
      </a>
    );
  }
})

export default ProductComponent;
