import * as React from 'react';
import PropTypes from 'prop-types';
// import store from '@/store';

// import TextField from 'material-ui/TextField';
// import DatePicker from 'material-ui/DatePicker';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';
// import getTime from '@/utils/format/getTime';
import HInput from '@/components/form/h-input';
import HSelect from '@/components/form/h-select';
import HTextarea from '@/components/form/h-textarea';
import HDate from '@/components/form/h-date';
import intl from '@/components/intl';
/*
    planDesc         "描述"
    planFinishDate   "计划完成时间"
    prblmId          "197452"
    prblmPhaseID     "问题阶段"
    rspnsUser        "责任人"
    workPlanID       "101644"
    workPlanStatus   "状态"
*/

export class WorkPlanEdit extends React.Component {
    static defaultProps = {
        data: {}
    }
    static propTypes = {
        data: PropTypes.object,
        parent: PropTypes.instanceOf(React.Component).isRequired
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
        // 改变父级的一些状态
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
    render() {
        intl.setMsg(require('@/static/i18n').default)
        // var { data } = this.props;
        return (
            <div className="work-plan-edit-form">
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="planDesc">{intl.get('QMS.WorkingPlan')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HTextarea
                            clear
                            value={this.state.planDesc}
                            onChange={this.bind('planDesc')}
                        >
                        </HTextarea>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="prblmPhaseID">{intl.get('QMS.Step')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.prblmPhaseID}
                            onChange={this.bind('prblmPhaseID')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="rspnsUser">{intl.get('QMS.Champion')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            value={this.state.rspnsUser}
                            onChange={this.bind('rspnsUser')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">{intl.get('QMS.ECD')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HDate
                            clear
                            type="date"
                            value={this.state.planFinishDate}
                            onChange={this.bind('planFinishDate')}
                        >
                        </HDate>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">{intl.get('QMS.ACD')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HDate
                            clear
                            type="date"
                            value={this.state.planFinishDate}
                            onChange={this.bind('planFinishDate')}
                        >
                        </HDate>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">{intl.get('QMS.Status')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HSelect
                            value={this.state.workPlanStatus}
                            options={[]}
                            onChange={this.bind('workPlanStatus')}
                        >
                        </HSelect>
                    </div>
                </div>
                <div className="flex-row btn">
                    <div className="flex-col-1 text-center">
                        <RaisedButton fullWidth={true} onClick={this.save}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-save"></use>
                            </svg>
                            {intl.get('QMS.Save')}
                        </RaisedButton>
                    </div>
                    <div className="flex-col-1 text-center">
                        <RaisedButton fullWidth={true} onClick={this.cancel}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-cancel"></use>
                            </svg>
                            {intl.get('QMS.Cancel')}
                        </RaisedButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkPlanEdit
