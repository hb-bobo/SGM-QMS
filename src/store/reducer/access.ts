// import { States, Action } from '../../types';
import * as types from '../actions/actionTypes';

/* interface------------------------------ */
interface States {
    menuAuthoritys: MenuAuthority[];
    handleAuthoritys: HandleAuthority[]
}

interface MenuAction {
    type: string;
    payload: MenuAuthority[];
}
// 菜单权限
export interface MenuAuthority {
    PERMISSION_CODE: string,
    PARENT_PERMISSION_CODE: string,
    LEVEL: number | string,
    PERMISSION_NAME_CN: string,
    PERMISSION_TYPE: string,
    PERMISSION_URL: string
}

interface HandleAction {
    type: string;
    payload: HandleAuthority[];
}
// 操作/ 按钮
export interface HandleAuthority {
    LEVEL: number,
    PARENT_PERMISSION_CODE: string,
    PERMISSION_CODE: string,
    PERMISSION_NAME_CN: string,
    PERMISSION_TYPE: string
}
/* interface------------------------------ */

export default {
    state: {
        menuAuthoritys: [], // 菜单权限,
        handleAuthoritys: []  // 操作/ 按钮权限
    },
    // 用 types 作key保证action唯一性  相当于字符串
    mutations: {
        /**
         * 更新菜单权限
         * @param state 
         * @param action 
         */
        [types.UP_MENU_AUTHORITYS] (state: States, action: MenuAction): void {
            state.menuAuthoritys = action.payload;
        },
        /**
         * 更新 操作/ 按钮 权限
         * @param state 
         * @param action 
         */
        [types.UP_HANDLE_AUTHORITYS] (state: States, action: HandleAction): void {
            state.handleAuthoritys = action.payload;
        },
    }
}
