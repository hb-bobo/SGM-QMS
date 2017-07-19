import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import HDate from '@/components/form/h-date';
import pathToJSON from '@/utils/object/pathToJSON';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import AppConfig from '@/AppConfig';
import { POST } from '@/plugins/fetch';
import dateFormat from '@/utils/format/dateFormat';

var isMounted = null;

/* currentStatus 是中文
    白 W
    黄 Y
    红 R
    绿 G
    黑 B
*/
/*质量评审计划*/
class HotIssueReviewPlan extends React.Component {
    static defaultProps = {
    }
    static propTypes = {
    }
    static contextTypes = {		
        store: PropTypes.object
    }
    state = {
        time: dateFormat(),
        listData: [],
        scrollConfig: {
            upContent: ''
        },
        pageNumber: 1,
    }
    componentDidMount () {
        isMounted = true;
        this.refresh('down');
    }
    componentWillUnmount () {
        isMounted = null
    }
    loadingMore = () => {
    
        if (this.state.scrollConfig.upContent === 'No More') {
            // 上拉结束
            this.refs.scroller.donePullup();
            return;
        }
        this.refresh('up');
    }
    /**
     * @param {'up' | 'down'} 上拉还是下拉
     */
    refresh = (action) => {
        
        if (action === 'down') {
            this.setState({
                pageNumber: 1,
                scrollConfig: {
                    upContent: ''
                }
            });
        }
        // AppConfig.listConfig.count 每次加多少条
        POST('/newProjectQuality/pcqueryCompanyQuailtyList', {
            data: {
                "empId": "P0892",
                "pageSize": AppConfig.listConfig.count,
                "pageNumber": this.state.pageNumber,
                "positNum": 'A3010274',
                "time" : this.state.time
            },
        })
        .then((res) => {
            if (isMounted === null) {return;}
            
            if (res.success === true) {
                var listData;
                
                // 刷新直接赋值，加载更多要保留原来的数据
                // 下拉结束
                if (action === 'down') {
                    this.refs.scroller.donePulldown();
                    listData = res.data;
                } else if (action === 'up') {
                    // 上拉结束
                    console.log('上啦结束')
                    this.refs.scroller.donePullup();
                    listData = this.state.listData.concat(res.data);
                }
                this.setState({
                    listData: listData,
                    pageNumber: this.state.pageNumber + 1,
                });
                // 最后的数据
                if (res.data.length < AppConfig.listConfig.count) {
                    this.setState({
                        scrollConfig: {
                            upContent: 'No More'
                        }
                    });
                }
            }
            
        });
    }
    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
        }
    }
    /* 评审计划查询刷新 */
    selectHis = (value) => {
        var listData = [{prblmNo:"1111",currentStatus:"G",prblmDesc:"1111",projectName:"11111",reviewLevel:"1111",prblmSeverity:1,dept:"1111",stockDay:1,crntPhase:"1111"},
                                {prblmNo:"222",currentStatus:"G",prblmDesc:"222",projectName:"222",reviewLevel:"222",prblmSeverity:1,dept:"222",stockDay:1,crntPhase:"222"}]
        this.setState({
            listData: listData
        });
        this.refresh('down');
        this.refs.scroller.to(40);
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
                    onPullupLoading={this.loadingMore}
                    onPulldownLoading={() => this.refresh('down')}
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