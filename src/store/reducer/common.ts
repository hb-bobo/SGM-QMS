import { States } from '../../types';
import * as types from '../actions/actionTypes';
import { Action } from '../../types';
export default {
    state: {
        tempData: {} // 临时数据
    },
    // 用 types 作key保证action唯一性
    mutations: {
        /* 更新临时数据(一般用作编辑，搜索) */
        [types.UP_TEMP_DATA] (state: States, action: Action) {
            state.tempData = action.payload;
        },
        /* clear临时数据 */
        [types.CLEAR_TEMP_DATA] (state: States, action: Action) {
            state.tempData = {};
        },
        /* 填充 fill list-item data, listData usually is a Array<{}>*/
        [types.FILL_LIST_DATA] (state: States, action: Action) {
            var payload = action.payload;
            state[payload.name + 'listData'] = payload.listData;
        },
    }
}
