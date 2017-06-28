import { Store, createStore } from 'redux'; // applyMiddleware
import rootReducer from './reducer';
// var initialState: Object = {};
var store: Store<any> = createStore(
        rootReducer
    );

export default store
