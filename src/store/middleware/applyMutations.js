/**
 * @param {Array}
 * reducerData = Array<reducers>
 */
function createReducer (reducerData) {
    var initialState = reducerData.state;
    var mutations = reducerData.mutations;
    // 返回一个reducer
    return function (state = initialState, action) {
        var copyState = Object.assign({}, state);
        // 根据type调用相应的mutations
        if (typeof mutations[action.type] === 'function') {
            mutations[action.type] && mutations[action.type](copyState, action);
            return copyState;
        }
        return state;
    }
}

/**
 * 有了这个，可以像vuex 的mutations一样写reducer
 * @param {Object} reducers
 * reducers = {
 *     state: any,
 *     mutations: {string: Function}
 * }
 */
export default function applyMutations (reducers) {
    var newReducers = {};
    if (Object.prototype.toString.call(reducers) === '[object Object]') {
        Object.keys(reducers).forEach((key) => {
            var reducerData = reducers[key];
            newReducers[key] = createReducer(reducerData);
        });
    }
    return newReducers;
}
