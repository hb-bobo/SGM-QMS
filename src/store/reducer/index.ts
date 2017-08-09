import { combineReducers } from 'redux';
import applyMutations from '../middleware/applyMutations';
import common from './common';
import issueAdvance from './issue-advance';
import access from './access';

const rootReducer = combineReducers(applyMutations({
    common,
    issueAdvance,
    access
}));
export default rootReducer;