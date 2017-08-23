
import {
    UP_TEMP_DATA,
    FILL_LIST_DATA,
    CLEAR_LIST_DATA,
    CLEAR_TEMP_DATA,
    UP_WORK_PLAN_EDIT_DATA,
    UP_WORK_PLAN_LIST_DATA,
    FILTER_WORK_PLAN_LIST_DATA,
    UP_MENU_AUTHORITYS,
    UP_ISSUE_SAVE_DATA,
    UP_HANDLE_AUTHORITYS
} from './actionTypes';
// import AppConfig from '../../AppConfig';
import { Action } from '../../types';

/* Action: 更新临时数据 */
export const upTempData: Function = function (payload: any): Action {
    return {
        type: UP_TEMP_DATA,
        payload: payload
    }
}
/* Action: clear临时数据 */
export const clearTempData: Function = function (payload: any): Action {
    return {
        type: CLEAR_TEMP_DATA,
        payload: payload
    }
}

/*列表*/
export const fillListData: Function = function (payload: any): Action {
    return {
        type: FILL_LIST_DATA,
        payload: payload
    }
}

export const clearListData: Function = function (payload: any): Action {
    return {
        type: CLEAR_LIST_DATA,
        payload: payload
    }
}

/**
 * 
 * 工作计划
 */

// 工作计划编辑或者新增
export const upWorkPlanEditData: Function = function (payload: any): Action {
    return {
        type: UP_WORK_PLAN_EDIT_DATA,
        payload: payload
    }
}
// up work plan all list data (include edit and new)
export const upWorkPlanListData: Function = function (payload: any): Action {
    return {
        type: UP_WORK_PLAN_LIST_DATA,
        payload: payload
    }
}
/* Action:过滤工作计划列表 */
export const filterWorkPlanListData: Function = function (payload: any): Action {
    return {
        type: FILTER_WORK_PLAN_LIST_DATA,
        payload: payload
    }
}

// 
export const setIssueSaveData: Function = function (payload: any): Action {
    return {
        type: UP_ISSUE_SAVE_DATA,
        payload: payload
    }
}

/**
 * 
 * 权限Action
 */

// 更新菜单权限
export const updateMenuAuthority: Function = function (payload: any): Action {
    return {
        type: UP_MENU_AUTHORITYS,
        payload: payload
    }
}
// 更按钮控制单权限
export const updateHandleAuthority: Function = function (payload: any): Action {
    return {
        type: UP_HANDLE_AUTHORITYS,
        payload: payload
    }
}

// 异步action 写法
export const getListData: Function = function (payload: any): any  {
    return function (dispatch: Function) {
        dispatch({
            type: UP_WORK_PLAN_LIST_DATA,
            payload: payload
        });
    }
}
