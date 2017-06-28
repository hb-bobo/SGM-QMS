
import {
  FILL_LIST_DATA,
  CLEAR_LIST_DATA,
  UP_TEMPE_DATA,
  CLEAR_TEMPE_DATA,
  UP_WORK_PLAN_EDIT_DATA,
  UP_WORK_PLAN_LIST_DATA
} from './actionTypes';
import AppConfig from '../../AppConfig';
import { Action } from '../../types';

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

export const upTempData: Function = function (payload: any): Action {
    return {
        type: UP_TEMPE_DATA,
        payload: payload
    }
}
export const clearTempData: Function = function (payload: any): Action {
    return {
        type: CLEAR_TEMPE_DATA,
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

export const getListData: Function = function (dispatch: Function): any  {
    var action = {
        type: FILL_LIST_DATA,
        payload: null
    }
    fetch(AppConfig.API + '/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'path': 'data.json'
            })
        }).then((res) => {
            return res.json()
        }).then((res) => {
            action.payload = res.EQRHotIssue.issueList
            dispatch(action)
        })
}
