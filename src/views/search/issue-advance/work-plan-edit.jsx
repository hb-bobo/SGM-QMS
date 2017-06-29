import * as React from 'react';
import PropTypes from 'prop-types';
// import store from '@/store';

import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';

import getTime from '@/utils/format/getTime';
/*
    planDesc         "描述"
    planFinishDate   "计划完成时间"
    prblmId          "197452"
    prblmPhaseID     "问题阶段"
    rspnsUser        "责任人"
    workPlanID       "101644"
    workPlanStatus   "状态"
*/

const minDate = new Date();
const maxDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 1);
minDate.setHours(0, 0, 0, 0);
maxDate.setFullYear(maxDate.getFullYear() + 1);
maxDate.setHours(0, 0, 0, 0);

export class WorkPlanEdit extends React.Component {
    static defaultProps = {
        data: {}
    }
    static propTypes = {
        data: PropTypes.object
    }
    
    state = {
        planDesc: '',
        planFinishDate: '',
        prblmId: '',
        prblmPhaseID: '',
        rspnsUser: '',
        workPlanID: '',
        workPlanStatus: ''
    }
    componentDidMount () {
        this.parent = this.props.parent;
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.action === 'add') {
            this.setState({
                planDesc: '',
                planFinishDate: '',
                prblmId: '',
                prblmPhaseID: '',
                rspnsUser: '',
                workPlanID: '',
                workPlanStatus: ''
            });
        }
        this.setState(nextProps.data);
        
        // this.parent.setState({workPlanOpen: false});
    }
    save = () => {
        this.parent.props.actions.upWorkPlanListData({
            action: this.props.action,
            value: this.state
        });
        this.parentStateChange();
    }
    cancel = () => {
        this.parentStateChange();
    }
    parentStateChange () {
        this.parent.setState({
            workPlanOpen: false
        });
        this.parent.parent.setState({
            isIndex: true
        });
    }
    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
            /*store.dispatch(upWorkPlanEditData({
                action: 'change',
                key: key,
                value: e.target.value
            }));*/
        }
    }
    DatePickerBind = (key) => {
        return (e, date) => {
            var newDate = getTime({
                time: date,
                format: 'yyyy-MM-dd'
            });
            console.log(newDate)
            this.setState(pathToJSON(key, newDate));
            /*store.dispatch(upWorkPlanEditData({
                action: 'change',
                key: key,
                value: date
            }));*/
        }
    }
    selectBind = (key) => {
        return (event, index, value) => {
            this.setState(pathToJSON(key, value));
            /*store.dispatch(upWorkPlanEditData({
                action: 'change',
                key: key,
                value: value
            }));*/
        }
    }
    render() {
        // var { data } = this.props;
        return (
            <div className="work-plan-edit-form" style={editFromStyle}>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="planDesc">工作描述:</label>
                    </div>
                    <div className="flex-col-7">
                        <TextField
                            name="planDesc"
                            multiLine={true}
                            value={this.state.planDesc}
                            onChange={this.bind('planDesc')}
                            rows={1}
                            rowsMax={3}
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="prblmPhaseID">问题阶段:</label>
                    </div>
                    <div className="flex-col-7">
                        <TextField
                            name="prblmPhaseID"
                            disabled={true}
                            value={this.state.prblmPhaseID}
                            onChange={this.bind('prblmPhaseID')}
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="rspnsUser">责任人:</label>
                    </div>
                    <div className="flex-col-7">
                        <TextField
                            name="rspnsUser"
                            value={this.state.rspnsUser}
                            onChange={this.bind('rspnsUser')}
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">计划完成时间:</label>
                    </div>
                    <div className="flex-col-7">
                        <DatePicker
                            name="planFinishDate"
                            floatingLabelText=""
                            autoOk={true}
                            cancelLabel="取消"
                            minDate={minDate}
                            maxDate={maxDate}
                            value={ this.state.planFinishDate ? new Date(this.state.planFinishDate) : null}
                            onChange={this.DatePickerBind('planFinishDate')}
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">实际完成时间:</label>
                    </div>
                    <div className="flex-col-7">
                        <DatePicker
                            name="planFinishDatea"
                            floatingLabelText=""
                            autoOk={true}
                            cancelLabel="取消"
                            minDate={minDate}
                            maxDate={maxDate}
                            value={ this.state.planFinishDate ? new Date(this.state.planFinishDate) : null}
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">状态:</label>
                    </div>
                    <div className="flex-col-7">
                        <select name="" id="">
                            <option value=""></option>
                            <option value="1">aaa</option>
                        </select>
                        {/*<SelectField
                            name="workPlanStatus"
                            value={this.state.workPlanStatus}
                            onChange={this.selectBind('workPlanStatus')}
                            hintText=""
                        >
                            <MenuItem value={null} primaryText="" />
                            <MenuItem value={'D'} primaryText="D" />
                            <MenuItem value={'F'} primaryText="F" />
                        </SelectField>*/}
                    </div>
                </div>
                <div className="flex-row btn">
                    <div className="flex-col-1 text-center">
                        <RaisedButton fullWidth={true} onClick={this.save}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-save"></use>
                            </svg>
                            保存
                        </RaisedButton>
                    </div>
                    <div className="flex-col-1 text-center">
                        <RaisedButton fullWidth={true} onClick={this.cancel}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-cancel"></use>
                            </svg>
                            取消
                        </RaisedButton>
                    </div>
                </div>
            </div>
        );
    }
}

var editFromStyle = {
    position: 'absolute',
    left: 0,
    top: 0
}
export default WorkPlanEdit
