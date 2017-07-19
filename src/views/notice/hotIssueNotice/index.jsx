import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import { POST } from '@/plugins/fetch';
import AppConfig from '@/AppConfig';

/*  //TODO //hotLevel  评审级别
    1: EQR专题
    2：EQR常规
    3: 项目热点
    4：售后EQR专题
    */
var isMounted = null;
class HotIssueNotice extends React.Component {
    static defaultProps = {
    }
    static propTypes = {
        goAdvance: PropTypes.func.isRequired
    }
    state = {
        listData: [],
        pageNumber: 1, // 第几页
        scrollConfig: {
            upContent: ''
        }
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
        POST('/backlog/PchotIssueNotice', {
            data: {
                "empId": "P0892",
                "pageSize": AppConfig.listConfig.count,
                "pageNumber": this.state.pageNumber,
                "positNum": 'A3010274'
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
    render () {
        intl.setMsg(require('@/static/i18n').default);
        var { goAdvance } = this.props;
        var { listData } = this.state;
        return (
            <div>
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
                                <div className="item-top flex-row">
                                    <div className="flex-col-9">
                                        <div onClick={() => {goAdvance(item.source, item.prblmNo)}}>
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
                </Scroller>
            </div>
        )
    }
}

export default HotIssueNotice