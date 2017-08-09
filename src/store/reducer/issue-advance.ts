import { States, Action } from '../../types';
import * as types from '../actions/actionTypes';

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
        workPlanData: [], // 工作计划所有,
        workPlanFilterData: []
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
                    state.workPlanData.unshift(payload.value);
                    break;
                case 'edit':
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
    },
    /* 过滤计划列表 */
    [types.FILTER_WORK_PLAN_LIST_DATA] (state: States, action: Action) {
        var filterVal: string = action.payload.filter;
        var data = state.workPlanData.filter((item: any) => {
            if (filterVal === '') {
                return item;
            } else if (item.prblmPhaseID === filterVal) {
                return item;
            }
        });
        state.workPlanFilterData = data;
    }
}
