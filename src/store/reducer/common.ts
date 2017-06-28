import { States } from '../../types';
import * as types from '../actions/actionTypes';
import { Action } from '../../types';
export default {
    state: {
        isLast: false,
        // 所有list
        listData: [],
        // 可见数据(当前数据)
        tempListData: [],
        // 临时数据
        tempData: {}
    },
    // 用 types 作key保证action唯一性
    mutations: {
        /*fill list-item data, listData usually is a Array<{}>*/
        [types.FILL_LIST_DATA] (state: States, action: Action) {
            console.log(action)
            state.listData = action.payload
        },
        [types.UP_TEMPE_DATA] (state: States, action: Action) {
            state.tempData = action.payload
        }
    }
}
