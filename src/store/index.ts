import { Store, createStore, applyMiddleware } from 'redux'; // applyMiddleware
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';
// var initialState: Object = {};
let createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)
var store: Store<any> = createStoreWithMiddleware(rootReducer);

export default store
