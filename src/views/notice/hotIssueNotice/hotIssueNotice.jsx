import * as React from 'react';
import PropTypes from 'prop-types';

import fetchList from '@/decorator/fetchList';
import {hotLevelFilter} from '@/mixins/';
import SilkScroller from '@/components/silk-scroller';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
// import { POST } from '@/plugins/fetch';
// import AppConfig from '@/AppConfig';

@fetchList('/notice/mHotIssueNotice')
class HotIssueNotice extends React.Component {
    static defaultProps = {
    }
    static propTypes = {
        goAdvance: PropTypes.func.isRequired,
        setListData: PropTypes.func,
        getListData: PropTypes.func,
        loadingMore: PropTypes.func,
    }
    state = {
    }
    componentDidMount () {
        // this.props.getListData('down');
        this.refs.scroller.simulatePullRefresh();
    }
    render () {
        var { goAdvance } = this.props;
        var { listData, noMoreData, getListData, loadingMore } = this.props;
        // onPulldownLoading={() => this.getListData('down')}
        return (
            <div>
                <SilkScroller
                    usePullRefresh
                    pullRefreshAction={(resolve, reject) => {getListData('down', resolve, reject)}}
                    useLoadMore
                    loadMoreAction={(resolve, reject) => loadingMore(resolve, reject)}
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
                                        <div onClick={() => {goAdvance(item.source, item.problemId)}}>
                                            <span className="issueNo"> {item.prblmNo}</span>
                                        </div>
                                        <div style={{marginTop: '0.6em'}}>
                                            <span> {item.problemDesc}</span>
                                        </div>
                                    </div>
                                    <div className="flex-col-1">
                                        <Circle value={item.state}></Circle>
                                    </div>
                                </div>
                                <div className="item-body">
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ReviewTime')}: </span>
                                            <span> {item.reviewTime}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ProgramName')}: </span>
                                            <span> {item.projectName}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.SeverityLevel')}: </span>
                                            <span> {item.problemSevertiy}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.CurrentStep')}: </span>
                                            <span> {item.crntPhase}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Dept')}: </span>
                                            <span> {item.pspnsDept}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Champion')}: </span>
                                            <span> {item.pspnsUser}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ReviewLevel')}: </span>
                                            <span> {hotLevelFilter(item.hotLevel)}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Age')}: </span>
                                            <span> {item.stockDay}</span>
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

export default HotIssueNotice