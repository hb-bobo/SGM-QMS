import * as React from 'react';
import PropTypes from 'prop-types';
import mixins from '@/decorator/mixins';
import {componentWillMount, componentWillUnmount, getListData, loadingMore} from '@/mixins/';
import Scroller2 from '@/components/scroller2';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

var subProjectId = null;
/* 热点问题 */
@mixins(componentWillMount, componentWillUnmount, getListData, loadingMore)
class HotIssue extends React.Component {
    static defaultProps = {
        getListDataAPI: '/ProjectQuality/mListHotIssue',
    }
    static propTypes = {
        getListDataAPI: PropTypes.string.isRequired,
        parent: PropTypes.instanceOf(React.Component).isRequired
    }
    state = {
        selectReLvl: ""
    }
    componentDidMount () {
        subProjectId = this.props.match.params.subProjectId;
        this.getListData('down', {
            subProjectId: subProjectId,
            hotLevel: 0
        });
        this.props.parent.setState({
            title: intl.get('QMS.HotIssues')
        });
    }

    /* 评审级别查询刷新 */
    selectChange = (ev) => {
        var value = ev.target.value;
        this.getListData('down', {
            subProjectId: subProjectId,
            hotLevel: value
        });
    }  
    render () {
        intl.setMsg(require('@/static/i18n').default);
        var { listData, noMoreData } = this.state;
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
                <Scroller2
                    usePullRefresh
                    pullRefreshAction={(resolve, reject) => {this.getListData('down', resolve, reject)}}
                    useLoadMore
                    loadMoreAction={(resolve, reject) => this.loadingMore(resolve, reject)}
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
                </Scroller2>
            </div>
        )
    }
}

export default HotIssue