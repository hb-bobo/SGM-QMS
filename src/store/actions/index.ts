
import {
    UP_TEMP_DATA,
    FILL_LIST_DATA,
    CLEAR_LIST_DATA,
    CLEAR_TEMP_DATA,
    UP_WORK_PLAN_EDIT_DATA,
    UP_WORK_PLAN_LIST_DATA
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
/*异步action*/
export const getListData: Function = function (payload: any): any  {
    return function (dispatch: Function) {
        dispatch({
            type: UP_WORK_PLAN_LIST_DATA,
            payload: payload
        });
    }
}
