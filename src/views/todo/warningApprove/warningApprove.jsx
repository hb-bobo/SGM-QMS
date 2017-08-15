import * as React from 'react';
import PropTypes from 'prop-types';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { fillListData } from '@/store/actions';

import fetchList from '@/decorator/fetchList';

import FlatButton from 'material-ui/FlatButton';
import { Toast } from 'antd-mobile';
// import Scroller from '@/components/scroller';
import SilkScroller from '@/components/silk-scroller';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import { POST } from '@/plugins/fetch';
// import AppConfig from '@/AppConfig';


//TODO 上升级别
/*  
    0: 工程师
    1： EGM
    2： 高级经理
    3： 总监
*/
// @connect(
//     // mapStateToProps
//     (state) => ({listData: state.common.listData}),
//     // buildActionDispatcher
//     (dispatch, ownProps) => ({
//         actions: bindActionCreators({
//             fillListData,
//         }, dispatch)
//     })
// )
@fetchList('/toDo/mPromptNoticeApporve')
class WarningApprove extends React.Component {
    static defaultProps = {
    }
    static propTypes = {
        parent: PropTypes.instanceOf(React.Component).isRequired,
        setListData: PropTypes.func,
        getListData: PropTypes.func,
        loadingMore: PropTypes.func,
    }
    state = {
    }

    componentDidMount () {
        this.setState({
            title: intl.get('Detail')
        });
        // this.props.getListData('down');
        this.refs.scroller.simulatePullRefresh();
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
    approveCtrl (problemId, prblmUpgradeOp) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        POST('/mproblem/auditUpgrade', {
            headers,
            data: {
                empId: sessionStorage.getItem('empId'),
                positNum: sessionStorage.getItem('positNum'),
                prblmId: problemId,
                prblmUpgradeOp: prblmUpgradeOp
            }
        })
        .then((res) => {
            // 成功了本地删除，不刷新
            if (res.success === true) {
                Toast.info('操作成功');
                var newListData = Object.assign({}, this.state.listData);
                newListData.some((item, i) => {
                    if (item.prblmId === problemId) {
                        newListData.splice(i, 1);
                        return true;
                    }
                    return false;
                })
            } else {
                Toast.info('操作失败');
            }
        })
    }

    render () {
        var { listData, noMoreData, getListData, loadingMore } = this.props;
        var {goAdvance} = this.props.parent;
        //onPulldownLoading={() => this.getListData('down')}
        /*<Scroller
                autoSetHeight={true}
                bounce={true}
                onPullupLoading={() => this.loadingMore()}
                config={this.state.scrollConfig}
                ref="scroller"
            >*/
        return (
            <SilkScroller
                usePullRefresh
                pullRefreshAction={(resolve, reject) => {getListData('down', resolve, reject)}}
                useLoadMore
                loadMoreAction={(resolve, reject) => loadingMore(resolve, reject)}
                noMoreData={noMoreData}
                preventDefault={false}
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
                                                {/* 放 问题标题  <span className="left">
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
                                                <div>
                                                    <span>{intl.get('ApplyLevel')}: </span>
                                                    <span className="right">{item.promotion}</span>
                                                </div>
                                            </div>
                                            <div className="flex-col-1">
                                                <div className="review-time">
                                                    <span>{intl.get('ApplyUser')}: </span>
                                                    <span>{item.name}</span>
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
                                                    <span>{intl.get('QMS.CurrentIssueStep')}: </span>
                                                    <span className="right">{item.crntPhase}</span>
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
                                                    <span>{intl.get('QMS.Age')}: </span>
                                                    <span className="right">{item.stockDay}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-row btn">
                                        <div className="flex-col-1">
                                            <FlatButton 
                                                label={intl.get('QMS.Approve')}
                                                fullWidth={true}
                                                labelStyle={{paddingLeft:'0'}}
                                                onClick={this.approve(item.problemId)}
                                            >
                                                <svg className="icon" aria-hidden="true">
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
 
export default WarningApprove;