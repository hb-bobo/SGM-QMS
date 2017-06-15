import * as React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';
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
    state = {
        minDate: minDate,
        maxDate: maxDate,
        autoOk: false,
        disableYearSelection: false,
        value: null,
        editData: {
            planDesc: '2017-10-27',
            planFinishDate: minDate,
            prblmId: '',
            prblmPhaseID: '',
            rspnsUser: '',
            workPlanID: '',
            workPlanStatus: 'Yes',
        }
    }

    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
        }
    }
    handleChange = (event, index, value) => this.setState({value});
    render() {
        var { editData } = this.state;
        return (
            <div className="work-plan-edit-from">
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">工作描述:</label>
                    </div>
                    <div className="flex-col-7">
                        <TextField
                            hintText="hintText"
                            multiLine={true}
                            value={editData.planDesc}
                            onChange={this.bind('editData.planDesc')}
                            rows={3}
                            rowsMax={3}
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">问题阶段:</label>
                    </div>
                    <div className="flex-col-7">
                        <TextField
                            value={editData.prblmPhaseID}
                            onChange={this.bind('editData.prblmPhaseID')}
                            hintText="hintText"
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">责任人:</label>
                    </div>
                    <div className="flex-col-7">
                        <TextField
                            value={editData.rspnsUser}
                            onChange={this.bind('editData.rspnsUser')}
                            hintText="hintText"
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">计划完成时间:</label>
                    </div>
                    <div className="flex-col-7">
                        <DatePicker
                            floatingLabelText="Ranged Date Picker"
                            autoOk={this.state.autoOk}
                            minDate={this.state.minDate}
                            maxDate={this.state.maxDate}
                            defaultDate={minDate}
                            disableYearSelection={this.state.disableYearSelection}
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">实际完成时间:</label>
                    </div>
                    <div className="flex-col-7">
                        <DatePicker
                            floatingLabelText="Ranged Date Picker"
                            autoOk={this.state.autoOk}
                            minDate={this.state.minDate}
                            maxDate={this.state.maxDate}
                            disableYearSelection={this.state.disableYearSelection}

                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">状态:</label>
                    </div>
                    <div className="flex-col-7">
                        <SelectField
                            value={editData.workPlanStatus}
                            onChange={this.bind('editData.workPlanStatus')}
                            hintText="hintText"
                        >
                            <MenuItem value={null} primaryText="" />
                            <MenuItem value={false} primaryText="No" />
                            <MenuItem value={true} primaryText="Yes" />
                        </SelectField>
                    </div>
                </div>
                <div className="flex-row">
                    <div className="flex-col-1 text-center">
                        <RaisedButton>保存</RaisedButton>
                    </div>
                    <div className="flex-col-1 text-center">
                        <RaisedButton>取消</RaisedButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkPlanEdit
