import { States, Action } from '../../types';
import * as types from '../actions/actionTypes';

export default {
    state: {
        tempData: {}, // 临时数据
        appBarTitle: '',
        isClearOldtabValue: true // 是否清除记录的tabValue，具体看CreateTabs.jsx
    },
    // 用 types 作key保证action唯一性
    mutations: {
        /**
         * 更新临时数据(一般用作编辑，搜索) 
         * @param 一般用作编辑 
         * @param 搜索 
         */
        [types.UP_TEMP_DATA] (state: States, action: Action) {
            state.tempData = action.payload;
        },
        /**
         * clear临时数据
         * @param state 
         */
        [types.CLEAR_TEMP_DATA] (state: States) {
            state.tempData = {};
        },
        /**
         * set bar title text
         * @param state 
         * @param action 
         */
        [types.SET_APP_TITLE] (state: States, action: Action) {
            state.appBarTitle = action.payload;
        },

        /**
         * 清除记录的tabValue，具体看CreateTabs.jsx
         */
        clearOldTabValue (state: States, action: Action) {
            state.isClearOldtabValue = action.payload;
        }
    }
}
