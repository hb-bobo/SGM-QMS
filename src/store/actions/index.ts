import {
  FILL_LIST_DATA,
  CLEAR_LIST_DATA,
  UP_TEMPE_DATA,
  CLEAR_TEMPE_DATA
} from './actionTypes';
import AppConfig from '../../AppConfig';
// action 格式
interface Action {
    type: string,
    payload: any
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
