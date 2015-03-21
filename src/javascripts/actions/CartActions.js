import Reflux from 'reflux';
import backend from '../utils/backendSync';

var actions = Reflux.createActions([
  'receiveCartData',
  'addToCart',
  'removeFromCart',
  'changeQuantity'
]);

actions.addToCart.preEmit = backend.add;
actions.removeFromCart.preEmit = backend.remove;
actions.changeQuantity.preEmit = backend.changeQuantity;

export default actions;
