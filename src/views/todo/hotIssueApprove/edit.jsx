import * as React from 'react';
import PropTypes from 'prop-types';
// import store from '@/store';

import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';
import HTextarea from '@/components/form/h-textarea';
import HInput from '@/components/form/h-input';
import HDate from '@/components/form/h-date';
import intl from '@/components/intl';
/*
    s
*/

class HotIssueEdit extends React.Component {
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
    componentWillMount () {
        console.log(this)
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
    }
    submit = () => {
        /*this.parent.props.actions.upWorkPlanListData({
            action: this.props.action,
            value: this.state
        });*/
        this.parentStateChange();
    }
    cancel = () => {
        this.parentStateChange();
    }
    // 改变父级的状态
    parentStateChange () {
        this.parent.setState({
            hotIssueEditOpen: false,
            isIndex: true
        });
    }
    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
        }
    }
    render() {
        // var { data } = this.props;
        return (
            <div className="hot-up-form">
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="planDesc" className="justify">{intl.get('QMS.IssueNo')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.prblmId}
                            onChange={this.bind('prblmId')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="rspnsUser" className="justify">{intl.get('QMS.WorkingPlanDescription')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HTextarea
                            clear
                            type="text"
                            disabled
                            value={this.state.planDesc}
                            onChange={this.bind('planDesc')}
                        >
                        </HTextarea>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.Status')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.workPlanStatus}
                            onChange={this.bind('workPlanStatus')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.ReviewLevel')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.rspnsUser}
                            onChange={this.bind('rspnsUser')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.ReviewTime')}:</label>
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
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.Age')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.planFinishDate}
                            onChange={this.bind('planFinishDate')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.Champion')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.xx}
                            onChange={this.bind('xx')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.ProgramName')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.xx}
                            onChange={this.bind('xx')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.Dept')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.xx}
                            onChange={this.bind('xx')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.IssueSeverity')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.xx}
                            onChange={this.bind('xx')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.CurrentStep')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.xx}
                            onChange={this.bind('xx')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.Reason')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HInput
                            clear
                            type="text"
                            disabled
                            value={this.state.xx}
                            onChange={this.bind('xx')}
                        >
                        </HInput>
                    </div>
                </div>
                <div className="flex-row btn">
                    <div className="flex-col-1 text-center">
                        <RaisedButton fullWidth={true} onClick={this.submit}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-submit"></use>
                            </svg>
                            {intl.get('QMS.Submit')}
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

export default HotIssueEdit;