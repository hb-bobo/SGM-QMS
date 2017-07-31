import * as React from 'react';
import PropTypes from 'prop-types';

import mixins from '@/decorator/mixins';
import {componentWillMount, componentWillUnmount, getListData, loadingMore} from '@/mixins/';
import Scroller2 from '@/components/scroller2';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
// import { POST } from '@/plugins/fetch';
// import AppConfig from '@/AppConfig';

/*  //TODO //hotLevel  评审级别
    1: EQR专题
    2：EQR常规
    3: 项目热点
    4：售后EQR专题
    */
@mixins(componentWillMount, componentWillUnmount, getListData, loadingMore)
class HotIssueNotice extends React.Component {
    static defaultProps = {
        getListDataAPI: '/notice/mHotIssueNotice'
    }
    static propTypes = {
        getListDataAPI: PropTypes.string.isRequired,
        goAdvance: PropTypes.func.isRequired
    }
    state = {
    }
    componentDidMount () {
        this.getListData('down');
    }
    render () {
        intl.setMsg(require('@/static/i18n').default);
        var { goAdvance } = this.props;
        var { listData, noMoreData } = this.state;
        // onPulldownLoading={() => this.getListData('down')}
        return (
            <div>
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
                                            <span> {item.hotLevel}</span>
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
                </Scroller2>
            </div>
        )
    }
}

export default HotIssueNotice