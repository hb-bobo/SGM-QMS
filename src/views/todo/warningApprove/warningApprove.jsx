import * as React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fillListData } from '@/store/actions';
import FlatButton from 'material-ui/FlatButton';

import Scroller from '@/components/scroller';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import { POST } from '@/plugins/fetch';
import AppConfig from '@/AppConfig';

var isMounted = null;
//TODO 上升级别
/*  
    0: 工程师
    1： EGM
    2： 高级经理
    3： 总监
*/
@connect(
    // mapStateToProps
    (state) => ({listData: state.common.listData}),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            fillListData,
        }, dispatch)
    })
)
class WarningApprove extends React.Component {
    static defaultProps = {
        listData: []
    }
    static propTypes = {
        listData: PropTypes.array,
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
        // var listData = [{prblmNo:"222",problemDesc:"222",state:"W",promotion:1,problemSevertiy:1,stockDay:11,projectName:"222",name:"222",crntPhase:"222"},
        //                 {prblmNo:"111",problemDesc:"111",state:"G",promotion:2,problemSevertiy:2,stockDay:22,projectName:"111",name:"111",crntPhase:"111"}]
        this.setState({
            title: intl.get('Detail')
        });
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
        /* setTimeout(() => {
            if (isMounted === null) {return;}
            this.setState({
                dataSource: getProjectQualityList.result.concat(this.state.dataSource),
                scrollConfig: {
                    upContent: 'No More'
                },
                fetchStatus: true
            });
            
        }, 500); */
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
        POST('/backlog/PcpromptNoticeApporve', {
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
                console.log(action)
                // 刷新直接赋值，加载更多要保留原来的数据
                // 下拉结束
                if (action === 'down') {
                    
                    this.refs.scroller.donePulldown();
                    listData = res.data;
                } else if (action === 'up') {
                    // 上拉结束
                    this.refs.scroller.donePullup();
                    listData = this.state.listData.concat(res.data);
                }
                 console.log(listData)
                this.setState({
                    listData: listData,
                    pageNumber: this.state.pageNumber + 1,
                });
                if (res.data.length < AppConfig.listConfig.count) {
                    this.setState({
                        scrollConfig: {
                            upContent: 'No More'
                        }
                    });
                }
            }
            
        });   
        /* setTimeout(() => {
            if (isMounted === null) {return;}
            this.setState({
                dataSource: getProjectQualityList.result,
                scrollConfig: {
                    upContent: ''
                },
                page: 1,
            });
            // 下拉结束
            this.refs.scroller.donePulldown();
        }, 500) */
    }
    // Go to Advance page
    goAdvance = (advanceType) => {
        this.props.goAdvance('/search/issue-advance/' + advanceType);
    }
    // Approved the hot review item
    approve (id) {
        return () => {
            console.log(id, '批准')
        }
    }
    // Reject the hot review item
    reject (id) {
        return () => {
            console.log(id, '驳回')
        }
    }
    render () {
        var { listData } = this.state;
        intl.setMsg(require('@/static/i18n').default,require('./locale'));
        console.log(listData)
        return (
            <Scroller
                autoSetHeight={true}
                onPullupLoading={this.loadingMore}
                onPulldownLoading={() => this.refresh('down')}
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
                                                    onClick={() => this.goAdvance(item.source, item.prblmNo)}
                                                >
                                                {item.prblmNo}
                                                </span>
                                            </div>
                                            <div style={{marginTop: '0.6em'}}>
                                                {/*TODO 放 问题标题  <span className="left">
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
                                                <div>
                                                    <span>{intl.get('ApplyLevel')}: </span>
                                                    <span className="right">{item.promotion}</span>
                                                </div>
                                            </div>
                                            <div className="flex-col-1">
                                                <div className="review-time">
                                                    <span>{intl.get('ApplyUser')}: </span>
                                                    <span>{item.name}</span>
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
                                                    <span>{intl.get('QMS.CurrentIssueStep')}: </span>
                                                    <span className="right">{item.crntPhase}</span>
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
                                                    <span>{intl.get('QMS.Age')}: </span>
                                                    <span className="right">{item.stockDay}</span>
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
                                                onClick={this.approve(1321312)}
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
                                                onClick={this.reject(123123)}
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
 
export default WarningApprove;