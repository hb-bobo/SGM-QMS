import * as React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { 
    upTempData,
    clearTempData
} from '@/store/actions';
import FlatButton from 'material-ui/FlatButton';
import { Toast } from 'antd-mobile';
// import Drawer from 'material-ui/Drawer';
import fetchList from '@/decorator/fetchList';
import {
    hotLevelFilter
} from '@/mixins/';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import SilkScroller from '@/components/silk-scroller';
import HotIssueEdit from './edit';
import { POST } from '@/plugins/fetch';


/*热点评审审批*/

@fetchList('/toDo/mHotIssueApprove')
class HotIssueApprove extends React.Component {
    static defaultProps = {
    }
    static propTypes = {
        parent: PropTypes.instanceOf(React.Component).isRequired,
        setListData: PropTypes.func,
        getListData: PropTypes.func,
        loadingMore: PropTypes.func,
    }
    state = {
        hotIssueEditOpen: false,
        hotIssueEditData: {}
    }
    componentDidMount () {
        var {parent} = this.props;
        // var data = require('./data.json').data;
        // getListData(this, 'down');
        this.refs.scroller.simulatePullRefresh();
        // 设置父级弹出的内容
        parent.setDrawerChildren(
            <HotIssueEdit 
                tabValue={parent.tabValue}
                parent={this}
            />
        )

        // TODO
        var res = {"data":[{"acrossModel":"","assistDiagnoseNum":"","breakpointTime":"","carModel":"","causeAnalysis":"","classify":"","crntPhase":"Feedback","dept":"","dutyName":"","eri":"","erroneous":"","focusRange":"","hotLevel":"1","impactProjectName":"","iptvOrCpv":"","loborcod":"","longSolution":"","mileage":"","month":"","name":"","nameId":"","numberValue":"","parentPrblmNo":"","pcrsLink":"","planActualFinishDate":"","planFinishDate":"","pqmName":"","prblmNo":"1840492","prblmSeverity":"","problemDesc":"LAMP ASM-RR BODY STRUCTURE STOP LH+RH , side panel to decklid LH+RH - Watertest #3 - Water leakage at RR body lamps","problemId":"197460","problemPhase":"","problemSevertiy":"2","projectName":"","promotion":"","pspnsDept":"","pspnsId":"","pspnsUser":"","readacrossId":"","releaseStatus":"","remark":"","reviewOp":"待审批","reviewTime":"2017-08-16","riseLevel":"3","shortSolution":"","source":"PRTS","state":"W","stockDay":"","taskId":"","taskName":"","taskNum":"","toDoId":"102991","updateDate":"","updateTime":"","updateUser":"","upgradeReason":"测试速度","validFlag":0,"workPlan":"","workPlans":[]},{"acrossModel":"","assistDiagnoseNum":"","breakpointTime":"","carModel":"","causeAnalysis":"","classify":"","crntPhase":"Implementation","dept":"","dutyName":"","eri":"","erroneous":"","focusRange":"","hotLevel":"1","impactProjectName":"","iptvOrCpv":"","loborcod":"","longSolution":"","mileage":"","month":"","name":"","nameId":"","numberValue":"","parentPrblmNo":"","pcrsLink":"","planActualFinishDate":"","planFinishDate":"","pqmName":"","prblmNo":"1836656","prblmSeverity":"","problemDesc":"MODULE ASM , HMI - Screen is blank during start up","problemId":"197458","problemPhase":"","problemSevertiy":"2","projectName":"","promotion":"","pspnsDept":"","pspnsId":"","pspnsUser":"","readacrossId":"","releaseStatus":"","remark":"","reviewOp":"待审批","reviewTime":"2017-08-31","riseLevel":"3","shortSolution":"","source":"PRTS","state":"W","stockDay":"","taskId":"","taskName":"","taskNum":"","toDoId":"102989","updateDate":"","updateTime":"","updateUser":"","upgradeReason":"","validFlag":0,"workPlan":"","workPlans":[]},{"acrossModel":"","assistDiagnoseNum":"","breakpointTime":"","carModel":"","causeAnalysis":"","classify":"","crntPhase":"Complete-Cancel","dept":"","dutyName":"","eri":"","erroneous":"","focusRange":"","hotLevel":"1","impactProjectName":"","iptvOrCpv":"","loborcod":"","longSolution":"","mileage":"","month":"","name":"","nameId":"","numberValue":"","parentPrblmNo":"","pcrsLink":"","planActualFinishDate":"","planFinishDate":"","pqmName":"","prblmNo":"EIR-R-D26-11-LIR-0014","prblmSeverity":"","problemDesc":"自动大灯-延迟","problemId":"181388","problemPhase":"","problemSevertiy":"4","projectName":"D2UC-MY18","promotion":"","pspnsDept":"","pspnsId":"","pspnsUser":"","readacrossId":"","releaseStatus":"","remark":"","reviewOp":"待审批","reviewTime":"2017-08-17","riseLevel":"0","shortSolution":"","source":"EIR","state":"W","stockDay":"","taskId":"","taskName":"","taskNum":"","toDoId":"102903","updateDate":"","updateTime":"","updateUser":"","upgradeReason":"","validFlag":0,"workPlan":"","workPlans":[]},{"acrossModel":"","assistDiagnoseNum":"","breakpointTime":"","carModel":"","causeAnalysis":"","classify":"","crntPhase":"Implementation","dept":"","dutyName":"","eri":"","erroneous":"","focusRange":"","hotLevel":"1","impactProjectName":"","iptvOrCpv":"","loborcod":"","longSolution":"","mileage":"","month":"","name":"蒋爽Jiang Shuang","nameId":"","numberValue":"","parentPrblmNo":"","pcrsLink":"","planActualFinishDate":"","planFinishDate":"","pqmName":"","prblmNo":"1893213","prblmSeverity":"","problemDesc":"IP End CAP , IP - Inconsistent Installation and Engagement of Clips","problemId":"197491","problemPhase":"","problemSevertiy":"3","projectName":"D2UC-MY18","promotion":"","pspnsDept":"内饰部","pspnsId":"","pspnsUser":"","readacrossId":"","releaseStatus":"","remark":"","reviewOp":"待审批","reviewTime":"2017-08-08","riseLevel":"3","shortSolution":"","source":"PRTS","state":"W","stockDay":"","taskId":"","taskName":"","taskNum":"","toDoId":"102802","updateDate":"","updateTime":"","updateUser":"","upgradeReason":"测试测试接口而已！！！！！！！！！！！！！","validFlag":0,"workPlan":"","workPlans":[]},{"acrossModel":"","assistDiagnoseNum":"","breakpointTime":"","carModel":"","causeAnalysis":"","classify":"","crntPhase":"Feedback","dept":"","dutyName":"","eri":"","erroneous":"","focusRange":"","hotLevel":"","impactProjectName":"","iptvOrCpv":"","loborcod":"","longSolution":"","mileage":"","month":"","name":"","nameId":"","numberValue":"","parentPrblmNo":"","pcrsLink":"","planActualFinishDate":"","planFinishDate":"","pqmName":"","prblmNo":"1840492","prblmSeverity":"","problemDesc":"LAMP ASM-RR BODY STRUCTURE STOP LH+RH , side panel to decklid LH+RH - Watertest #3 - Water leakage at RR body lamps","problemId":"197460","problemPhase":"","problemSevertiy":"2","projectName":"","promotion":"","pspnsDept":"","pspnsId":"","pspnsUser":"","readacrossId":"","releaseStatus":"","remark":"","reviewOp":"待审批","reviewTime":"2017-07-25","riseLevel":"3","shortSolution":"","source":"PRTS","state":"W","stockDay":"","taskId":"","taskName":"","taskNum":"","toDoId":"102169","updateDate":"","updateTime":"","updateUser":"","upgradeReason":"test","validFlag":0,"workPlan":"","workPlans":[]},{"acrossModel":"","assistDiagnoseNum":"","breakpointTime":"","carModel":"","causeAnalysis":"","classify":"","crntPhase":"Implementation","dept":"","dutyName":"","eri":"","erroneous":"","focusRange":"","hotLevel":"","impactProjectName":"","iptvOrCpv":"","loborcod":"","longSolution":"","mileage":"","month":"","name":"","nameId":"","numberValue":"","parentPrblmNo":"","pcrsLink":"","planActualFinishDate":"","planFinishDate":"","pqmName":"","prblmNo":"1836656","prblmSeverity":"","problemDesc":"MODULE ASM , HMI - Screen is blank during start up","problemId":"197458","problemPhase":"","problemSevertiy":"2","projectName":"","promotion":"","pspnsDept":"","pspnsId":"","pspnsUser":"","readacrossId":"","releaseStatus":"","remark":"","reviewOp":"待审批","reviewTime":"","riseLevel":"3","shortSolution":"","source":"PRTS","state":"W","stockDay":"","taskId":"","taskName":"","taskNum":"","toDoId":"101857","updateDate":"","updateTime":"","updateUser":"","upgradeReason":"","validFlag":0,"workPlan":"","workPlans":[]},{"acrossModel":"","assistDiagnoseNum":"","breakpointTime":"","carModel":"","causeAnalysis":"","classify":"","crntPhase":"Feedback","dept":"","dutyName":"","eri":"","erroneous":"","focusRange":"","hotLevel":"","impactProjectName":"","iptvOrCpv":"","loborcod":"","longSolution":"","mileage":"","month":"","name":"","nameId":"","numberValue":"","parentPrblmNo":"","pcrsLink":"","planActualFinishDate":"","planFinishDate":"","pqmName":"","prblmNo":"1840492","prblmSeverity":"","problemDesc":"LAMP ASM-RR BODY STRUCTURE STOP LH+RH , side panel to decklid LH+RH - Watertest #3 - Water leakage at RR body lamps","problemId":"197460","problemPhase":"","problemSevertiy":"2","projectName":"","promotion":"","pspnsDept":"","pspnsId":"","pspnsUser":"","readacrossId":"","releaseStatus":"","remark":"","reviewOp":"待审批","reviewTime":"","riseLevel":"3","shortSolution":"","source":"PRTS","state":"W","stockDay":"","taskId":"","taskName":"","taskNum":"","toDoId":"101855","updateDate":"","updateTime":"","updateUser":"","upgradeReason":"","validFlag":0,"workPlan":"","workPlans":[]},{"acrossModel":"","assistDiagnoseNum":"","breakpointTime":"","carModel":"","causeAnalysis":"","classify":"","crntPhase":"Implementation","dept":"","dutyName":"","eri":"","erroneous":"","focusRange":"","hotLevel":"","impactProjectName":"","iptvOrCpv":"","loborcod":"","longSolution":"","mileage":"","month":"","name":"","nameId":"","numberValue":"","parentPrblmNo":"","pcrsLink":"","planActualFinishDate":"","planFinishDate":"","pqmName":"","prblmNo":"1836656","prblmSeverity":"","problemDesc":"MODULE ASM , HMI - Screen is blank during start up","problemId":"197458","problemPhase":"","problemSevertiy":"2","projectName":"","promotion":"","pspnsDept":"","pspnsId":"","pspnsUser":"","readacrossId":"","releaseStatus":"","remark":"","reviewOp":"待审批","reviewTime":"","riseLevel":"3","shortSolution":"","source":"PRTS","state":"W","stockDay":"","taskId":"","taskName":"","taskNum":"","toDoId":"101853","updateDate":"","updateTime":"","updateUser":"","upgradeReason":"test tode","validFlag":0,"workPlan":"","workPlans":[]},{"acrossModel":"","assistDiagnoseNum":"","breakpointTime":"","carModel":"","causeAnalysis":"","classify":"","crntPhase":"Solution","dept":"","dutyName":"","eri":"","erroneous":"","focusRange":"","hotLevel":"1","impactProjectName":"","iptvOrCpv":"","loborcod":"","longSolution":"","mileage":"","month":"","name":"陈鹏Chen Peng","nameId":"","numberValue":"","parentPrblmNo":"","pcrsLink":"","planActualFinishDate":"","planFinishDate":"","pqmName":"","prblmNo":"1892006","prblmSeverity":"","problemDesc":"fcm bracket , interior - FFX PVB 4171 TE#7  wrong FCM bracket can be installed","problemId":"197504","problemPhase":"","problemSevertiy":"3","projectName":"E2UL-MY19","promotion":"","pspnsDept":"空调电子部","pspnsId":"","pspnsUser":"","readacrossId":"","releaseStatus":"","remark":"","reviewOp":"待审批","reviewTime":"2017-07-13","riseLevel":"0","shortSolution":"","source":"PRTS","state":"W","stockDay":"","taskId":"","taskName":"","taskNum":"","toDoId":"101790","updateDate":"","updateTime":"","updateUser":"","upgradeReason":"test notice","validFlag":0,"workPlan":"","workPlans":[]}],"success":true};
        this.setState({
            listData: res.data,
        });
    }
    componentWillUnmount () {
        this.$store.dispatch(clearTempData()); 
    }
    // edit review time
    edit (data) {
        this.$store.dispatch(upTempData(data));
        this.setState({
            hotIssueEditOpen: true,
            title: intl.get('QMS.ReviewTime'),
            isIndex: false
        });
        this.props.parent.setState({
            hotIssueEditOpen: true,
        });
        return false;
    }
    // Approved the hot review item
    approve (problemId) {
        return () => {
            this.approveCtrl(problemId, 'Y')
        }
    }
    // Reject the hot review item
    reject (problemId) {
        return () => {
            this.approveCtrl(problemId, 'N')
        }
    }
    /**
     * 审批操作
     * @param {string | number} problemId 
     * @param {string} "Y" | "N" y是审批通过 
     */
    approveCtrl (problemId, prblmReviewOp) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        POST('/mproblem/auditReviewLog', {
            headers,
            data: {
                empId: sessionStorage.getItem('empId'),
                positNum: sessionStorage.getItem('positNum'),
                prblmId: problemId,
                prblmReviewOp: prblmReviewOp
            }
        })
        .then((res) => {
            // 成功了本地删除，不刷新
            if (res.success === true) {
                Toast.info('操作成功');
                var newListData = JSON.parse(JSON.stringify(this.props.listData));
                newListData.some((item, i) => {
                    if (item.problemId === problemId) {
                        newListData.splice(i, 1);
                        return true;
                    }
                    return false;
                });
                this.props.setListData(newListData);
            } else {
                Toast.info('操作失败');
            }
        })
    }
    render () {
        var { noMoreData, getListData, loadingMore } = this.props;
        var {goAdvance} = this.props.parent;

        // TODO
        var {listData} = this.state;
        // intl.setMsg(require('./locale').default);
        // onPulldownLoading={() => this.getListData('down')}
        /*<Scroller 
            autoSetHeight={true}
            bounce={true}
            onPullupLoading={() => this.loadingMore()}
            config={this.state.scrollConfig}
            ref="scroller"
        >
            
        </Scroller>*/
        return (

            <SilkScroller
                usePullRefresh
                pullRefreshAction={(resolve, reject) => getListData('down', resolve, reject)}
                useLoadMore
                loadMoreAction={(resolve, reject) => loadingMore(resolve, reject)}
                noMoreData={noMoreData}
                preventDefault={false}
                directionLockThreshold={100}
                ref="scroller"
            >
                <div className="gtasks-list">
                    {
                        listData && listData.map((item, i) => {
                            return (
                                <div className="item" key={i}>
                                    <div className="flex-row item-top">
                                        <div className="flex-col-9">
                                            <div>
                                                <span 
                                                    className="issueNo"
                                                    style={{marginLeft: 0}}
                                                    onClick={() => goAdvance(item.source, item.problemId)}
                                                >
                                                {item.prblmNo}
                                                </span>
                                            </div>
                                            <div style={{marginTop: '0.6em'}}>
                                            {/*放 问题标题 ?  <span className="left">
                                                    {intl.get('QMS.WorkingPlanDescription')}:
                                                </span> */}
                                                <span className="right">
                                                    {item.problemDesc}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-col-1">
                                            <Circle value={item.state}/>
                                        </div>
                                    </div>
                                    <div className="item-body">
                                        <div className="flex-row">
                                            <div className="flex-col-1">
                                                <div>{/* 评审级别 */}
                                                    <span>{intl.get('QMS.ReviewLevel')}: </span>
                                                    <span className="right">{hotLevelFilter(item.hotLevel)}</span>
                                                </div>
                                            </div>
                                            <div className="flex-col-1">
                                                <div className="review-time">
                                                    <span>{intl.get('QMS.ReviewTime')}: </span>
                                                    <span>{item.reviewTime}</span>
                                                    <span className="review-time-edit" onClick={() => this.edit(item)}>
                                                        <svg className="icon icon-edit1" aria-hidden="true">
                                                            <use xlinkHref="#icon-edit1"></use>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-row">
                                            <div className="flex-col-1">
                                                <div>
                                                    <span>{intl.get('QMS.Age')}: </span>
                                                    <span className="right">{item.stockDay}</span>
                                                </div>
                                            </div>
                                            <div className="flex-col-1">
                                                <div>
                                                    <span>{intl.get('QMS.Champion')}: </span>
                                                    <span className="right">{item.pspnsUser}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-row">
                                            <div className="flex-col-1">
                                                <div>
                                                    <span>{intl.get('QMS.ProgramName')}: </span>
                                                    <span className="right">{item.projectName}</span>
                                                </div>
                                            </div>
                                            <div className="flex-col-1">
                                                <div>
                                                    <span>{intl.get('QMS.Dept')}: </span>
                                                    <span className="right">{item.pspnsDept}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-row">
                                            <div className="flex-col-1">
                                                <div>
                                                    <span>{intl.get('QMS.SeverityLevel')}: </span>
                                                    <span className="right">{item.problemSevertiy}</span>
                                                </div>
                                            </div>
                                            <div className="flex-col-1">
                                                <div>
                                                    <span>{intl.get('QMS.CurrentStep')}: </span>
                                                    <span className="right">{item.crntPhase}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-row">
                                            <div className="flex-col-1">
                                                <div>
                                                    <span>{intl.get('QMS.Reason')}: </span>
                                                    <span className="right">{item.upgradeReason}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        item.aprvr === sessionStorage.getItem('empId') 
                                            ? (
                                                <div className="flex-row btn">
                                                    <div className="flex-col-1">
                                                        <FlatButton 
                                                            label={intl.get('QMS.Approve')}
                                                            fullWidth={true}
                                                            labelStyle={{paddingLeft:'0'}}
                                                            onClick={this.approve(item.problemId)}
                                                        >
                                                            <svg className="icon icon-pass" aria-hidden="true">
                                                                <use xlinkHref="#icon-pass"></use>
                                                            </svg>
                                                        </FlatButton>
                                                        
                                                    </div>
                                                    <SpaceRow height={30} width="1px"/>
                                                    <div className="flex-col-1">
                                                        <FlatButton 
                                                            label={intl.get('QMS.Reject')}
                                                            fullWidth={true}
                                                            labelStyle={{paddingLeft:'0'}}
                                                            onClick={this.reject(item.problemId)}
                                                        >
                                                            <svg className="icon" aria-hidden="true">
                                                                <use xlinkHref="#icon-reject"></use>
                                                            </svg>
                                                        </FlatButton>
                                                    </div>
                                                </div>
                                            )
                                            : null
                                    }
                                    
                                    <SpaceRow height={6} width="100%"/>
                                </div>
                            )
                        })
                    }
                </div>
            </SilkScroller>
            
        )
    }
}
 
export default HotIssueApprove;