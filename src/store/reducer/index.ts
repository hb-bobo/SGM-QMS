import { combineReducers } from 'redux';
import applyMutations from '../middleware/applyMutations';
import common from './common';
import issueAdvance from './issue-advance';

const rootReducer = combineReducers(applyMutations({
    common,
    issueAdvance
}));
export default rootReducer;
