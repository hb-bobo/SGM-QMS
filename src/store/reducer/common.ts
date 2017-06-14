import { States } from '../../types';
import * as types from '../actions/actionTypes';

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
        [types.DEL_ITEM] (state: States, action: any) {
            state.b = action
        },
        [types.FILL_LIST_DATA] (state: States, action: any) {
            console.log(action)
            state.listData = action.payload
        }
    }
}
