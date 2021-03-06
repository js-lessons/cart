import React from 'react';
import Product from './ProductComponent';

var ShopComponent = React.createClass({
  render() {
    var productNodes = this.props.products.map((product, index) => {
      return <Product product={product} key={index} />
    });

    return (
      <div className='shop'>
        <h1>Shop</h1>
        <div className='row'>
          {productNodes}
        </div>
      </div>
    );
  }
});

export default ShopComponent;
