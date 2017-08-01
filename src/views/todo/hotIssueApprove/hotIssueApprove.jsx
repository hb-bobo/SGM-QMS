import * as React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { 
    upTempData,
    clearTempData
} from '@/store/actions';
import FlatButton from 'material-ui/FlatButton';
// import Drawer from 'material-ui/Drawer';
import fetchList from '@/decorator/fetchList';
import {
    hotLevelFilter
} from '@/mixins/';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import SilkScroller from '@/components/scroller2';
import HotIssueEdit from './edit';
import { POST } from '@/plugins/fetch';

/*热点评审审批*/
// @fetchList('/toDo/mHotIssueApprove')
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
    }
    componentWillUnmount () {
        this.$store.dispatch(clearTempData()); 
    }
    // TODO 测试
    // loadingMore = () => {
    //     setTimeout(() => {
    //         this.setState({
    //             listData: this.state.listData.concat(require('./data.json').data)
    //         });
    //         // this.refs.scroller.donePullup();
    //         this.setState({
    //             scrollConfig: {
    //                 upContent: 'No More'
    //             },
    //             noMoreData: true
    //         });
    //     }, 2000)
    // }
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
        return () => {console.log('btn')
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
                empId: 'P0892',
                positNum: 'A3010274',
                prblmId: problemId,
                prblmReviewOp: prblmReviewOp
            }
        })
        .then((res) => {
            if (res.success === true) {
                alert('成功')
                var newListData = JSON.parse(JSON.stringify(this.props.listData));
                newListData.some((item, i) => {
                    if (item.problemId === problemId) {
                        console.log(item.problemId, newListData.splice(i, 1))
                        return true;
                    }
                    return false;
                });
                this.props.setListData(newListData);
            }
        })
    }
    render () {
        var { listData, noMoreData, getListData, loadingMore } = this.props;
        var {goAdvance} = this.props.parent;
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
                useSticky
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
 
export default HotIssueApprove;