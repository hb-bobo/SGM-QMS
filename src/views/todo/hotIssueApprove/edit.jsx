import * as React from 'react';
import PropTypes from 'prop-types';
// import store from '@/store';

import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';
import HTextarea from '@/components/form/h-textarea';
import HInput from '@/components/form/h-input';
import HDate from '@/components/form/h-date';
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
        var options = ['aa', 'xxxx', 'xvv']
        return (
            <div className="hot-up-form">
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="planDesc" className="justify">问题编号:</label>
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
                        <label htmlFor="rspnsUser" className="justify">计划描述:</label>
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
                        <label htmlFor="" className="justify">问题状态:</label>
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
                        <label htmlFor="" className="justify">评审等级:</label>
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
                        <label htmlFor="" className="justify">评审时间:</label>
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
                        <label htmlFor="" className="justify">在库时间:</label>
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
                        <label htmlFor="" className="justify">责 任 人:</label>
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
                        <label htmlFor="" className="justify">项目名称:</label>
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
                        <label htmlFor="" className="justify">责任部门:</label>
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
                        <label htmlFor="" className="justify">问题等级:</label>
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
                        <label htmlFor="" className="justify">问题阶段:</label>
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
                        <label htmlFor="" className="justify">上升理由:</label>
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
                            提交
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

export default HotIssueEdit;