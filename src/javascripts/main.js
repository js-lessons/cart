require("!style!css!less!../stylesheets/main.less");

var React = require("react");

var products = require('./data/products');
var Backend = require('./utils/backendSync');
var AppComponent = require('./components/AppComponent');

window.React = React;

React.render(
  <AppComponent products={products}/>,
  document.getElementById('app')
);

Backend.fetch();
