import React from 'react';
import Reflux from 'reflux';

import Shop from './ShopComponent';
import Cart from './CartComponent';
import CartStore from '../stores/CartStore';

var AppComponent = React.createClass({
  mixins: [Reflux.connect(CartStore, 'cart')],

  getInitialState() {
    return { cart: [] }
  },

  render() {
    return (
      <div className='app'>
        <Shop products={this.props.products} />
        <Cart cart={this.state.cart}/>
      </div>
    );
  }
});

export default AppComponent;
