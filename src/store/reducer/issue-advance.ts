import { States } from '../../types';
import * as types from '../actions/actionTypes';
import { Action } from '../../types';

interface WorkPlanDataItem {
    [x: string]: any
}
interface WorkPlanUpAction extends Action {
    payload: {
        action: string,
        workPlanID?: string | number,
        value: WorkPlanDataItem
    }
}

export default {
    state: {
        workPlanEditData: {},
        workPlanData: [] // 工作计划所有
    },
    // 用 types 作key保证action唯一性
    mutations: {
        /* Update the work plan edit/add data */
        [types.UP_WORK_PLAN_EDIT_DATA] (state: States, action: Action) {
            var { payload } = action;
            state.workPlanEditData = JSON.parse(JSON.stringify(state.workPlanEditData));
            if (payload.action === 'change') {
                var key: string = payload.key;
                state.workPlanEditData[key] = payload.value;
                return;
            }
            state.workPlanEditData = action.payload.value
        },
        /* 工作计列表 */
        [types.UP_WORK_PLAN_LIST_DATA] (state: States, action: WorkPlanUpAction) {
            var { payload } = action;
            switch (payload.action) {
                case 'update':
                    state.workPlanData = payload.value;
                    break;
                case 'add':
                    console.log(payload.value)
                    state.workPlanData.unshift(payload.value);
                    break;
                case 'edit':
                    console.log(payload)
                    state.workPlanData = state.workPlanData.concat([]);
                    state.workPlanData.some(function (item: WorkPlanDataItem, i: number): boolean {
                        if (item.workPlanID === payload.value.workPlanID) {
                            state.workPlanData.splice(i, 1, payload.value);
                            return true;
                        }
                        return false;
                    });
                    break;
                case 'del':
                    // reducer 不允许有副作用。splice 会修改原来的state,所以要一个新的地址的数组(值一样)
                    state.workPlanData = state.workPlanData.concat([]);
                    state.workPlanData.some(function (item: WorkPlanDataItem, i: number): boolean {
                        if (item.workPlanID === payload.workPlanID) {
                            state.workPlanData.splice(i, 1);
                            return true;
                        }
                        return false;
                    });
                    break;
                default:
                    return;
            }
        }
    }
}
