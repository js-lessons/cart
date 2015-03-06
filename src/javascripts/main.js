require("!style!css!less!../stylesheets/main.less");

var $ = require("jquery");
var React = require("react");

var products = require('./data/products');
var AppComponent = require('./components/AppComponent');

require("./lib/Stuff.js");

var CartStore = Stuff('shopping_cart');
CartStore.on('change', renderApp);

window.React = React;

function renderApp() {
  var cart = CartStore.map(function (id) {
    var product = CartStore.get(id);
    product.id = id;
    return product;
  });

  React.render(
    <AppComponent products={products} cart={cart}/>,
    document.getElementById('app')
  );

  //$('#app').html(AppComponent({
    //products: products,
    //cart: cart
  //}));
}


$(function() {
  renderApp();

  /* Shop handlers */

  $('#app').on('click', '.add-to-cart', function(e) {
    e.preventDefault();

    var cartProduct;
    var code = $(e.currentTarget).data('product');
    var product = products.filter(function(product) {
      return product.code === code;
    })[0];

    var cartProductId = CartStore.find(function(id) {
      return CartStore.get(id).code === code;
    });

    if(cartProductId) {
      cartProduct = CartStore.get(cartProductId);
      cartProduct.quantity++;
      CartStore.update(cartProductId, cartProduct);
    } else {
      // Should clone this object
      product.quantity = 1;
      CartStore.add(product);
    }
  });


  /* Cart handlers */

  $('#app').on('click', '.delete', function(e) {
    e.preventDefault();
    var id = $(e.target).data('product');
    CartStore.remove(id);
  });

  $('#app').on('change', 'input', function(e) {
    var id = $(e.target).data('product');
    var value = $(e.target).val();
    var product = CartStore.get(id);

    product.quantity = parseInt(value);
    CartStore.update(id, product);
  });
});
