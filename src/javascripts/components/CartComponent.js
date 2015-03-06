var React = require('react');
var CartProductComponent = require('./CartProductComponent');

var CartComponent = React.createClass({
  render: function() {
    return (
    );
  }
})

//function CartComponent(cart) {
  //var html = [
    //'<h1>Your order</h1>',

    //'<% cart.forEach(function(product) {',
      //'print(CartProductComponent(product))',
    //'}) %>',

    //'<div class="row">',
      //'<div class="total col-md-3">',
        //'Total: <span class="total-amount">$<%= total %></span>',
      //'</div>',
    //'</div>'
  //].join("\n");

  //var total = cart.reduce(function(s, product) {
    //return s += product.price * product.quantity;
  //}, 0);

  //return _.template(html)({
    //cart: cart,
    //total: total,
    //CartProductComponent: CartProductComponent
  //});
//}

module.exports = CartComponent;
