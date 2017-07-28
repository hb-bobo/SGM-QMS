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
import mixins from '@/decorator/mixins';
import {
    componentWillMount,
    componentWillUnmount,
    getListData,
    loadingMore
} from '@/mixins/';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import Scroller from '@/components/scroller';
import HotIssueEdit from './edit';
import { POST } from '@/plugins/fetch';

/*  //TODO //hotLevel
    1: EQR专题
    2：EQR常规
    3: 项目热点
    4：售后EQR专题
    */

@mixins(componentWillMount, componentWillUnmount, getListData, loadingMore)
class HotIssueApprove extends React.Component {
    static defaultProps = {
        getListDataAPI: '/toDo/mHotIssueApprove'
    }
    static propTypes = {
        getListDataAPI: PropTypes.string.isRequired,
        parent: PropTypes.instanceOf(React.Component).isRequired,
    }
    state = {
        hotIssueEditOpen: false,
        hotIssueEditData: {},
    }
    componentDidMount () {
        var {parent} = this.props;
        // var data = require('./data.json').data;

        //TODO 测试
        // this.getListData('down');
        this.setState({
            listData: require('./data.json').data
        });
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
    loadingMore = () => {
        this.setState({
            listData: this.state.listData.concat(require('./data.json').data)
        });
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
            if (res.success === '') {
                // var listData = Object.assign({}, this.state.listData);
                console.log(res)
            }
        })
    }
    render () {
        var { listData } = this.state;
        var {goAdvance} = this.props.parent;
        // intl.setMsg(require('./locale').default);

        return (
            <Scroller 
                autoSetHeight={true}
                onPullupLoading={() => this.loadingMore()}
                onPulldownLoading={() => this.getListData('down')}
                config={this.state.scrollConfig}
                ref="scroller"
            >
                <div className="gtasks-list">
                    {
                        listData.map((item, i) => {
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
                                                    <span className="right">{item.hotLevel}</span>
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
            </Scroller>
        )
    }
}
 
export default HotIssueApprove;