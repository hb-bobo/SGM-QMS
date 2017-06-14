import { combineReducers } from 'redux';
import applyMutations from '../middleware/applyMutations';
import common from './common';
// import pushItemList from './pushItemList';

const rootReducer = combineReducers(applyMutations({
    common,
    // pushItemList
}));
export default rootReducer;
