import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';
import HTextarea from '@/components/form/h-textarea';
import HInput from '@/components/form/h-input';
import HDate from '@/components/form/h-date';
import intl from '@/components/intl';
import Scroller from '@/components/scroller';
import { POST } from '@/plugins/fetch';
/*
    s
*/
@connect(
    // mapStateToProps 取store的state到當前的組件的props上
    (state) => ({tempData: state.common.tempData})
)
class HotIssueEdit extends React.Component {
  static defaultProps = {
    }
    static propTypes = {
        tempData: PropTypes.object,
        parent: PropTypes.instanceOf(React.Component).isRequired
    }
    
    state = {
        reviewTime: ''
    }
    componentDidMount () {
        this.parent = this.props.parent;
    }
    componentWillReceiveProps (nextProps) {
        this.setState(nextProps.tempData);
    }
    submit = () => {
        POST('/toDo/mUpdateTime', {
            data: {
                toDoId: this.state.toDoId,
                reviewTime: this.state.reviewTime
            }
        })
        .then((res) => {
            if (res.success === true) {
                // var listData = Object.assign({}, this.state.listData);
                console.log(res)
                this.parentStateChange();
            }
        })
        
    }
    cancel = () => {
        this.parentStateChange();
    }
    // 改变父父级的状态(因为hotIssueEditOpen挂在父父级的state里)
    parentStateChange () {
        this.parent.props.parent.setState({
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
        var data = this.state;
        return (
            <Scroller autoSetHeight={true} bounce={false}>
                <div className="hot-up-form">
                    <div className="edit-item flex-row">
                        <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                            <label htmlFor="planDesc" className="justify">{intl.get('QMS.IssueNo')}:</label>
                        </div>
                        <div className="flex-col-7">
                            <HInput
                                type="text"
                                disabled
                                defaultValue={data.prblmNo}
                            >
                            </HInput>
                        </div>
                    </div>
                    <div className="edit-item flex-row">
                        <div className="flex-col-3">
                            <label htmlFor="rspnsUser" className="">{intl.get('QMS.WorkingPlanDescription')}:</label>
                        </div>
                        <div className="flex-col-7">
                            <HTextarea
                                type="text"
                                disabled
                                defaultValue={data.problemDesc}
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
                                type="text"
                                disabled
                                defaultValue={data.state}
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
                                type="text"
                                disabled
                                defaultValue={data.hotLevel}
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
                                value={data.reviewTime}
                                onChange={this.bind('reviewTime')}
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
                                type="text"
                                disabled
                                defaultValue={data.stockDay}
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
                                type="text"
                                disabled
                                defaultValue={data.pspnsUser}
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
                                defaultValue={data.projectName}
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
                                type="text"
                                disabled
                                defaultValue={data.pspnsDept}
                            >
                            </HInput>
                        </div>
                    </div>
                    <div className="edit-item flex-row">
                        <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                            <label htmlFor="" className="">{intl.get('QMS.IssueSeverity')}:</label>
                        </div>
                        <div className="flex-col-7">
                            <HInput
                                type="text"
                                disabled
                                defaultValue={data.problemSevertiy}
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
                                type="text"
                                disabled
                                defaultValue={data.crntPhase}
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
                                type="text"
                                disabled
                                defaultValue={data.upgradeReason}
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
            </Scroller>
        );
    }
}

export default HotIssueEdit;