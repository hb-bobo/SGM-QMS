import {
  DEL_ITEM,
  FILL_LIST_DATA
} from './actionTypes';
import AppConfig from '../../AppConfig';
// action 格式
interface Action {
    type: string,
    payload: any
}
export const delItem: Function = function (payload: any): Action {
    return {
        type: DEL_ITEM,
        payload: payload
    }
}
export const fillListData: Function = function (payload: any): Action {
    return {
        type: FILL_LIST_DATA,
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
