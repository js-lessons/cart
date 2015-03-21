import "!style!css!less!../stylesheets/main.less";

import React from 'react';
import products from './data/products';
import Backend from './utils/backendSync';
import AppComponent from './components/AppComponent';

window.React = React;

React.render(
  <AppComponent products={products}/>,
  document.getElementById('app')
);

Backend.fetch();
