// import { States, Action } from '../../types';
import * as types from '../actions/actionTypes';

interface States {
    menuAuthoritys: MenuAuthority[];
}

interface Action {
    type: string;
    payload: MenuAuthority[];
}
// 菜单权限
export interface MenuAuthority {
    PERMISSION_CODE: string
    PARENT_PERMISSION_CODE: string
    LEVEL: number | string,
    PERMISSION_NAME_CN: string,
    PERMISSION_TYPE: string,
    PERMISSION_URL: string
}

export default {
    state: {
        menuAuthoritys: [] // 菜单权限
    },
    // 用 types 作key保证action唯一性
    mutations: {
        /**
         * 更新菜单权限
         * @param state 
         * @param action 
         */
        [types.UP_MENU_AUTHORITYS] (state: States, action: Action): void {
            state.menuAuthoritys = action.payload;
        },
    }
}
