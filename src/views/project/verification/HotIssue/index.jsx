import * as React from 'react';
import PropTypes from 'prop-types';
import fetchList from '@/decorator/fetchList';
import SilkScroller from '@/components/scroller2';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

var subProjectId = null;
/* 热点问题 */
@fetchList('/ProjectQuality/mListHotIssue')
class HotIssue extends React.Component {
    static defaultProps = {
    }
    static propTypes = {
        parent: PropTypes.instanceOf(React.Component).isRequired
    }
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        selectReLvl: 0
    }
    componentDidMount () {
        subProjectId = this.context.router.route.match.params.subProjectId;
        // this.props.getListData('down', {
        //     subProjectId: subProjectId,
        //     hotLevel: 0
        // });
        this.refs.scroller.simulatePullRefresh();
        this.props.parent.setState({
            title: intl.get('QMS.HotIssues')
        });
    }

    /* 评审级别查询刷新 */
    selectChange = (ev) => {
        var value = ev.target.value;
        this.refs.scroller.simulatePullRefresh();
        this.setState({
            selectReLvl: value
        });
    }  
    render () {
        intl.setMsg(require('@/static/i18n').default);
        var { listData, noMoreData, getListData, loadingMore } = this.props;
        var { goAdvance } = this.props.parent;
        return (
            <div>
                <div className="item-top flex-row">
                    <div className="flex-col-1">
                        <label htmlFor="">{intl.get('QMS.ReviewLevel')}:</label>
                    </div>
                    <div className="flex-col-2">                        
                        <select onChange={this.selectChange} style={{marginLeft: '8px'}}>
                            <option value="0">所有</option>
                            <option value="1">EQR专题</option>
                            <option value="2">EQR常规</option>
                            <option value="3">项目热点</option>
                        </select>
                    </div>
                </div>
                <SilkScroller
                    usePullRefresh
                    pullRefreshAction={(resolve, reject) => {
                        getListData('down', resolve, reject, {
                            subProjectId: subProjectId,
                            hotLevel: this.state.selectReLvl
                        })
                    }}
                    useLoadMore
                    loadMoreAction={(resolve, reject) => {
                        loadingMore(resolve, reject, {
                            subProjectId: subProjectId,
                            hotLevel: this.state.selectReLvl
                        })}
                    }
                    noMoreData={noMoreData}
                    preventDefault={false}
                    ref="scroller"
                >
                    {listData && listData.map((item, i) => {
                        return (
                            <div key={i} className="item">
                                <SpaceRow height="0.4em"/>
                                <div className="item-top flex-row">
                                    <div className="flex-col-9">
                                        <span>{intl.get('QMS.IssueNo')}: </span>
                                        <span
                                            className="issueNo"
                                            onClick={() => {goAdvance(item.source, item.problemId)}}
                                        >
                                            {item.issueId}
                                        </span>
                                    </div>
                                    <div className="flex-col-1">
                                        <Circle value={item.status}></Circle>
                                    </div>
                                </div>
                                <div className="item-body">
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Description')}: </span>
                                            <span> {item.description}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.SeverityLevel')}: </span>
                                            <span> {item.severity}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.CurrentStep')}: </span>
                                            <span> {item.step}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Dept')}: </span>
                                            <span> {item.department}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Champion')}: </span>
                                            <span> {item.responsible}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ReviewLevel')}: </span>
                                            <span> {item.hotLevel}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ReviewDate')}: </span>
                                            <span> {item.reviewTime}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ApprovalStatus')}: </span>
                                            <span> {item.reviewStatus}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Age')}: </span>
                                            <span> {item.instockDay}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ProgramName')}: </span>
                                            <span> {item.projectName}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </SilkScroller>
            </div>
        )
    }
}

export default HotIssue