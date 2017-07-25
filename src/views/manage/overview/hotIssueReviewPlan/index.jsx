import * as React from 'react';
import PropTypes from 'prop-types';

import mixins from '@/decorator/mixins';
import {componentWillMount, componentWillUnmount, getListData, loadingMore} from '@/mixins/';
import Scroller from '@/components/scroller';
import HDate from '@/components/form/h-date';
import pathToJSON from '@/utils/object/pathToJSON';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import dateFormat from '@/utils/format/dateFormat';
// import AppConfig from '@/AppConfig';
// import { POST } from '@/plugins/fetch';

/* currentStatus 是中文
    白 W
    黄 Y
    红 R
    绿 G
    黑 B
*/
/*质量评审计划*/
@mixins(
    componentWillMount,
    componentWillUnmount,
    getListData,
    loadingMore
)
class HotIssueReviewPlan extends React.Component {
    static defaultProps = {
        getListDataAPI: '/ProjectQuality/mQueryCompanyQuailtyList'
    }
    static propTypes = {
        getListDataAPI: PropTypes.string.isRequired,
    }
    static contextTypes = {		
        store: PropTypes.object
    }
    state = {
        time: dateFormat()
    }
    componentDidMount () {
        this.getListData('down', ['time']);
    }
    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
        }
    }
    /* 评审计划查询刷新 */
    selectHis = (value) => {
        this.refs.scroller.to('y', 50);
        this.getListData('down', {
            time: this.state.time
        });
        
    }
    render () {
        intl.setMsg(require('@/static/i18n').default);
        var { listData } = this.state;
        return (
            <div>
                <div className="item-body flex-row" style={{padding: "6px 12px", fontSize: "0.8em"}}>
                    <div className="flex-col-1">
                        <span>{intl.get('QMS.HistorySearch')}:</span>
                    </div>
                    <div className="flex-col-2">
                        <HDate
                            type="date"
                            value={this.state.time}
                            onChange={this.bind('time')}
                        >
                        </HDate>
                    </div>
                    <div className="flex-col-1" style={{marginLeft: "16px"}}>
                        <svg className="icon" onClick={() => {this.selectHis(this.state.time)}}>
                            <use xlinkHref="#icon-search"></use>
                        </svg>
                    </div>
                </div>

                <Scroller 
                    autoSetHeight={true}
                    onPullupLoading={() => this.loadingMore()}
                    onPulldownLoading={() => this.getListData('down', ['time'])}
                    config={this.state.scrollConfig}
                    ref="scroller"
                >
                    {listData.map((item, i) => {
                        return (
                            <div key={i} className="item">
                                <SpaceRow height="0.4em"/>
                                
                                <div className="item-body">
                                    <div className="flex-row">
                                        <div className="flex-col-9">
                                            <div>
                                                <span>{intl.get('QMS.IssueNo')}: </span>
                                                <span className="issueNo">{item.problemNo}</span>
                                            </div>
                                            <div style={{marginTop: '0.6em'}}>
                                                <span>{intl.get('QMS.Description')}: </span>
                                                <span>{item.prblmDesc}</span>
                                            </div>
                                        </div>
                                        <div className="flex-col-1">
                                            <Circle value={item.currentStatus}></Circle>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ProgramName')}: </span>
                                            <span> {item.projectName}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ReviewLevel')}: </span>
                                            <span> {item.reviewLevel}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.SeverityLevel')}: </span>
                                            <span> {item.prblmSeverity}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Dept')}: </span>
                                            <span> {item.dept}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Age')}: </span>
                                            <span> {item.stockDay}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.CurrentStep')}: </span>
                                            <span> {item.crntPhase}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Scroller>   

                
            </div>
        )
    }
}

export default HotIssueReviewPlan