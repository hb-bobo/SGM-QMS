import * as React from 'react';
import PropTypes from 'prop-types';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { fillListData } from '@/store/actions';

import mixins from '@/decorator/mixins';
import {componentWillMount, componentWillUnmount, getListData, loadingMore} from '@/mixins/';

import FlatButton from 'material-ui/FlatButton';

// import Scroller from '@/components/scroller';
import Scroller2 from '@/components/scroller2';
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
@mixins(componentWillMount, componentWillUnmount, getListData, loadingMore)
class WarningApprove extends React.Component {
    static defaultProps = {
        getListDataAPI: '/toDo/mPromptNoticeApporve'
    }
    static propTypes = {
        getListDataAPI: PropTypes.string.isRequired,
        parent: PropTypes.instanceOf(React.Component).isRequired,
    }
    state = {
    }

    componentDidMount () {
        this.setState({
            title: intl.get('Detail')
        });
        this.getListData('down');
        // this.refs.scroller.simulatePullRefresh();
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
                empId: 'P0892',
                positNum: 'A3010274',
                prblmId: problemId,
                prblmUpgradeOp: prblmUpgradeOp
            }
        })
        .then((res) => {
            if (res.success === '') {
                //TODO var listData = Object.assign({}, this.state.listData);
                console.log(res)
            }
        })
    }

    render () {
        var { listData, noMoreData } = this.state;
        var {goAdvance} = this.props.parent;
        intl.setMsg(require('@/static/i18n').default,require('./locale'));
        //onPulldownLoading={() => this.getListData('down')}
        /*<Scroller
                autoSetHeight={true}
                bounce={true}
                onPullupLoading={() => this.loadingMore()}
                config={this.state.scrollConfig}
                ref="scroller"
            >*/
        return (
            <Scroller2
                usePullRefresh
                pullRefreshAction={(resolve, reject) => {this.getListData('down', resolve, reject)}}
                useLoadMore
                loadMoreAction={(resolve, reject) => this.loadingMore(resolve, reject)}
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
                                                {/*TODO 放 问题标题  <span className="left">
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
            </Scroller2>
        )
    }
}
 
export default WarningApprove;