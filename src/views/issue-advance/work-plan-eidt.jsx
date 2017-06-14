import * as React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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
    }

    handleChangeMinDate = (event, date) => {
        this.setState({
        minDate: date,
        });
    };

    handleChangeMaxDate = (event, date) => {
        this.setState({
        maxDate: date,
        });
    };
    handleChange = (event, index, value) => this.setState({value});
  render() {
    return (
      <div className="work-plan-edit-from">
        <div className="edit-item flex-row">
            <div className="flex-col-3">
                <label htmlFor="">工作描述:</label>
            </div>
            <div className="flex-col-7">
                <TextField
                    hintText="MultiLine with rows: 2 and rowsMax: 4"
                    multiLine={true}
                    rows={3}
                    rowsMax={6}
                /><br />
            </div>
        </div>
        <div className="edit-item flex-row">
            <div className="flex-col-3">
                <label htmlFor="">问题阶段:</label>
            </div>
            <div className="flex-col-7">
                <TextField
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
                    value={'11'}
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
                    value={this.state.value}
                    onChange={this.handleChange}
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
