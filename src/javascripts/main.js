require("!style!css!less!../stylesheets/main.less");

var $ = require("jquery");
var React = require("react");

var products = require('./data/products');
var AppComponent = require('./components/AppComponent');

window.React = React;

function renderApp() {
  React.render(
    <AppComponent products={products}/>,
    document.getElementById('app')
  );
}


$(function() {
  renderApp();

  /* Cart handlers */

  //$('#app').on('click', '.delete', function(e) {
    //e.preventDefault();
    //var id = $(e.target).data('product');
    //CartStore.remove(id);
  //});

  //$('#app').on('change', 'input', function(e) {
    //var id = $(e.target).data('product');
    //var value = $(e.target).val();
    //var product = CartStore.get(id);

    //product.quantity = parseInt(value);
    //CartStore.update(id, product);
  //});
});
