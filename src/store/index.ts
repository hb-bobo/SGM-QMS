import { Store, createStore } from 'redux';
import rootReducer from './reducer';
var initialState: Object = {};
var store: Store<any> = createStore(rootReducer, initialState);

export default store
