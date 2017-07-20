import { States } from '../../types';
import * as types from '../actions/actionTypes';
import { Action } from '../../types';
export default {
    state: {
        isLast: false,
    },
    // 用 types 作key保证action唯一性
    mutations: {
        /* 填充 fill list-item data, listData usually is a Array<{}>*/
        [types.FILL_LIST_DATA] (state: States, action: Action) {
            var payload = action.payload;
            state[payload.name + 'listData'] = payload.listData;
        },
        /* 更新(push) */
        [types.UP_TEMPE_DATA] (state: States, action: Action) {
            var payload = action.payload;
            state[payload.name + 'listData'] = payload.listData;
        }
    }
}
