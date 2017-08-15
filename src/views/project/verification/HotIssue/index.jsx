import * as React from 'react';
import PropTypes from 'prop-types';
import fetchList from '@/decorator/fetchList';
import SilkScroller from '@/components/silk-scroller';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import HSelect from '@/components/form/h-select';

var subProjectId = null;

var selectOptions = [
    {
        text: "所有",
        value: '0'
    },
    {
        text: "EQR专题",
        value: '1'
    },
    {
        text: "EQR常规",
        value: '2'
    },
    {
        text: "项目热点",
        value: '3'
    },
]
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
        var { listData, noMoreData, getListData, loadingMore } = this.props;
        var { goAdvance } = this.props.parent;
        return (
            <div>
                <div className="item-top flex-row">
                    <div className="flex-col-1">
                        <label htmlFor="">{intl.get('QMS.ReviewLevel')}:</label>
                    </div>
                    <div className="flex-col-2">
                        <HSelect
                            style={{marginLeft: '0', height: '20px'}}
                            value={this.state.selectReLvl}
                            onChange={this.selectChange}
                            isFirstEmpty={false}
                            options={selectOptions}
                        />
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
                                            onClick={() => {goAdvance(item.problemSource, item.issueId)}}
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
                                        <div className="flex-col-5 flex-row">
                                            <div className="flex-col-3">
                                                <span>{intl.get('QMS.Description')}: </span>
                                            </div>
                                            <div className="flex-col-7" style={{paddingRight: "2px"}}>
                                                <span> {item.description} </span>
                                            </div>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.SeverityLevel')}: </span>
                                            <span> {item.severity}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5 flex-row">
                                            <div className="flex-col-3">
                                                <span>{intl.get('QMS.CurrentIssueStep')}: </span>
                                            </div>
                                            <div className="flex-col-7">
                                                <span> {item.step}</span>
                                            </div>
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