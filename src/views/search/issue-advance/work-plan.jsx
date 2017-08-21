import * as React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upWorkPlanEditData, upWorkPlanListData } from '@/store/actions';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { Toast } from 'antd-mobile';
// import pathToJSON from '@/utils/object/pathToJSON';
// import AppConfig from '@/AppConfig';
import WorkPlanEdit from './work-plan-edit';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
 // eslint-disable-next-line
import SilkScroller from '@/components/silk-scroller';
 // eslint-disable-next-line
import Scroller from '@/components/scroller';
import HSelect from '@/components/form/h-select';
import { POST } from '@/plugins/fetch';
import intl from '@/components/intl';
import array2Array from '@/utils/array/array2Array';

/*
    planDesc         "描述"
    planFinishDate   "计划完成时间"
    prblmId          "197452"
    prblmPhaseID     "问题阶段"
    rspnsUser        "责任人"
    workPlanID       "101644"
    workPlanStatus   "状态"
*/  

/**
 * 工作计划
 */
@connect(
    // mapStateToProps
    (state) => ({
        workPlanEditData: state.issueAdvance.workPlanEditData,
        workPlanData: state.issueAdvance.workPlanData
    }),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            upWorkPlanEditData,
            upWorkPlanListData,
        }, dispatch)
    })
)
class WorkPlan extends React.Component {
    static propTypes = {
        parent: PropTypes.instanceOf(React.Component).isRequired,
        workPlanOpen: PropTypes.bool.isRequired
    }
    
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        workPlanAction: '', // 编辑| 新增行为
        allWorkPlan: [], // 工作计划所有列表
        phase : [], // 阶段options
        pageNumber: 1, // 页数
        noMoreData: false,
        filter: '' // 阶段过滤选中value
    }
    componentWillMount () {
        this.parent = this.props.parent;
    }
    componentDidMount () {
        this.selectWorkPlan('down');
        // this.refs.scroller.simulatePullRefresh();
    }
    /**
     * 查询工作计划
     * @param {'up' | 'down'} 上拉还是下拉
     */
    selectWorkPlan = (action, resolve, reject) => {
        if (action === 'down') {
            this.setState({
                pageNumber: 1
            });
        }
        if (action === 'up' && this.state.noMoreData === true) {
            return;
        }
        // TODO
        var res = {"workplan":[{"changeType":"","count":1,"createBy":"","createTime":null,"createTimes":"","intr":"","isEff":"","planDesc":"dwqfdwafawfwew","planFinishDate":"2017-08-02","prblmId":"197458","prblmPhaseID":"Implementation","pwActlFinishDate":"2017-08-18","readacrossId":"","rspnsUser":"","updateBy":"","updateTime":null,"workPlanID":"102727","workPlanStatus":"F"},{"changeType":"","count":0,"createBy":"","createTime":null,"createTimes":"","intr":"","isEff":"","planDesc":"zz","planFinishDate":"2017-08-02","prblmId":"197458","prblmPhaseID":"Implementation","pwActlFinishDate":"","readacrossId":"","rspnsUser":"zz","updateBy":"","updateTime":null,"workPlanID":"102350","workPlanStatus":" "},{"changeType":"","count":0,"createBy":"","createTime":null,"createTimes":"","intr":"","isEff":"","planDesc":"ttt","planFinishDate":"2017-08-02","prblmId":"197458","prblmPhaseID":"Implementation","pwActlFinishDate":"","readacrossId":"","rspnsUser":"tt","updateBy":"","updateTime":null,"workPlanID":"102347","workPlanStatus":" "},{"changeType":"","count":0,"createBy":"","createTime":null,"createTimes":"","intr":"","isEff":"","planDesc":"tt","planFinishDate":"2017-08-04","prblmId":"197458","prblmPhaseID":"Implementation","pwActlFinishDate":"","readacrossId":"","rspnsUser":"ted","updateBy":"","updateTime":null,"workPlanID":"102341","workPlanStatus":" "},{"changeType":"","count":0,"createBy":"","createTime":null,"createTimes":"","intr":"","isEff":"","planDesc":"dd","planFinishDate":"2017-08-08","prblmId":"197458","prblmPhaseID":"Implementation","pwActlFinishDate":"","readacrossId":"","rspnsUser":"dd","updateBy":"","updateTime":null,"workPlanID":"102345","workPlanStatus":" "},{"changeType":"","count":0,"createBy":"","createTime":null,"createTimes":"","intr":"","isEff":"","planDesc":"aaaa","planFinishDate":"2017-08-11","prblmId":"197458","prblmPhaseID":"Implementation","pwActlFinishDate":"","readacrossId":"","rspnsUser":"","updateBy":"","updateTime":null,"workPlanID":"102726","workPlanStatus":"D"},{"changeType":"","count":0,"createBy":"","createTime":null,"createTimes":"","intr":"","isEff":"","planDesc":"2313","planFinishDate":"","prblmId":"197458","prblmPhaseID":"Implementation","pwActlFinishDate":"","readacrossId":"","rspnsUser":"","updateBy":"","updateTime":null,"workPlanID":"102725","workPlanStatus":"D"}],"success":true,"phase":[{"changeType":"","count":0,"createBy":"","createTime":null,"createTimes":"","intr":"","isEff":"","planDesc":"","planFinishDate":"","prblmId":"","prblmPhaseID":"Implementation","pwActlFinishDate":"","readacrossId":"","rspnsUser":"","updateBy":"","updateTime":null,"workPlanID":"","workPlanStatus":""}]};

        this.setState({
            allWorkPlan : res.workplan,
        });
        // POST('/mproblem/getWorkPlan', {
        //     data: {
        //         id: this.props.prblmId,
        //         page: this.state.pageNumber
        //     }
        // }).then((res) => {
        //     if (res.success === true) {
        //         var listData = [];
        //         // 下拉结束
        //         if (action === 'down') {
        //             listData = res.workplan;
        //             action = 'update';
        //         } else if (action === 'up') {
        //             // 上拉结束
        //             // this.refs.scroller.donePullup();
        //             listData = this.state.allWorkPlan.concat(res.workplan);
        //             action = 'update';
        //         }
        //         // store
        //         // this.props.actions.upWorkPlanListData({
        //         //     action: action,
        //         //     value: listData
        //         // });
        //         this.setState({
        //             allWorkPlan : listData,
        //             phase : res.phase,
        //             pageNumber : this.state.pageNumber+1
        //         });
        //         if (resolve) {resolve();}
        //         if (res.workplan.length < AppConfig.listConfig.count) {
        //             this.setState({
        //                 noMoreData: true
        //             });
        //         }
        //     } else {
        //         if (reject) {reject()}
        //     }
        // }).catch(function () {
        //     if (reject) {reject()}
        // })
    }
    loadingMore = (resolve, reject) => {
        this.selectWorkPlan('up', resolve, reject)
    }
    // 新增工作计划
    workPlanNewData = () => {
        this.setState({
            // workPlanOpen: true,
            workPlanAction: 'add'
        });
        // 重置值
        this.props.actions.upWorkPlanEditData({
            value: {}
        });
        this.parent.setState({
            workPlanOpen: true,
            title: intl.get('AddWorkPlan'),
            isIndex: false
        });
        //this.context.router.history.push('/search/issue-advance/PRTS?problemId=197944');
        // window.history.pushState(null, '', window.location.url);
        
        // router.history.push(`/search/issue-advance/work-plan-edit/${this.parent.state.advType}${router.route.location.search}`);
    }
    // 编辑工作计划
    workPlanDataEdit = (data) => {
        
        this.setState({
            // workPlanOpen: true,
            workPlanAction: 'edit'
        });
        this.props.actions.upWorkPlanEditData({
            value: data
        });
        this.parent.setState({
            workPlanOpen: true,
            title: intl.get('EditWorkPlan'),
            isIndex: false
        });
    }

    delItem = (workPlanID) => {
        if (window.confirm('确定删除?')) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            POST('/mproblem/deleteWorkPlan', {
                headers: headers,
                data: {
                    workPlanID: workPlanID,
                }
            }).then((res) => {
                if (res.success === true) {
                    this.selectWorkPlan('down');
                    Toast.info('删除成功');
                }else{
                    Toast.info('删除失败');
                }
            })
        }
    }

    changeFilter = (ev) => {
        this.setState({
            filter: ev.target.value
        });
    }
    
    render () {
        var {noMoreData, phase, allWorkPlan} = this.state; 
        var { workPlanEditData } = this.props;
        var containerHeight = 500;
        // 过滤后的工作计划
        var data = allWorkPlan.filter((item)=>{
            if(this.state.filter === ''){
                return item;
            } else if(item.prblmPhaseID === this.state.filter){
                return item;
            }
            return null;
        });
        
        // 下拉数据转换
        var workPlanSelectOptions = array2Array({
            data: phase,
            format: ['value', 'text'],
            originaFormat: ['prblmPhaseID', 'prblmPhaseID']
        });

        // 没有数据就不用显示那么高啦
        if (data.length === 0) {
            containerHeight = 100;
        } else {
            containerHeight = 400;
        }
        return (
            <div>
                <SpaceRow height={6} />
                <div className="work-paln-title issue-advance-item-title">
                <span>{intl.get('QMS.WorkingPlan')}</span>
                </div>
                <div className="flex-row issue-advance-item">
                    <div className="flex-col-8">
                        <span>{intl.get('QMS.Step')}: </span>
                        <HSelect
                            containerStyle={{width: '200px', marginLeft: '8px'}}
                            value={this.state.filter}
                            onChange={this.changeFilter}
                            emptyText={intl.get('QMS.Option')}
                            options={workPlanSelectOptions}
                        />
                    </div>
                    <div className="flex-col-2">
                        <svg onClick={this.workPlanNewData} className="icon icon-new" aria-hidden="true">
                            <use xlinkHref="#icon-new"></use>
                        </svg>
                    </div>
                </div>
                <div className="work-plan-list">
                    <Scroller
                        onPullupLoading={() => this.loadingMore()}
                        containerHeight={containerHeight}
                        autoSetHeight={false}
                        bounce={false}
                        noMoreData={noMoreData}
                        ref="scroller"
                    >  
                    {/* <Scroller
                        useLoadMore
                        loadMoreAction={(resolve, reject) => this.loadingMore(resolve, reject)}
                        noMoreData={noMoreData}
                        autoSetHeight={false}
                        containerHeight={containerHeight}
                        preventDefault={false}
                        bounce={false}
                        ref="scroller"
                    >  */}
                        {
                            data.map((item, i) => {
                                return (
                                    <div className="item" key={i}>
                                        <div className="flex-row plan-describe">
                                            <div className="flex-col-9">
                                                <span className="left">
                                                {intl.get('PlanDescription')}:
                                                </span>
                                                <span className="right">
                                                    {item.planDesc}
                                                </span>
                                            </div>
                                            <div className="flex-col-1">
                                                <Circle value={item.workPlanStatus}/>
                                            </div>
                                        </div>
                                        <div className="item-body">
                                            <div className="flex-row plan-info">
                                                <div className="flex-col-1">
                                                    <div>
                                                        <span>{intl.get('QMS.Champion')}: </span>
                                                        <span className="right">{item.rspnsUser}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-col-1">
                                                    <div>
                                                        <span>{intl.get('QMS.CurrentStep')}: </span>
                                                        <span>{item.prblmPhaseID}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-row plan-info">
                                                <div className="flex-col-1">
                                                    <div>
                                                        <span>{intl.get('ECD')}: </span>
                                                        <span className="right">{item.planFinishDate}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-col-1">
                                                    <div>
                                                        <span>{intl.get('ACD')}: </span>
                                                        <span className="right">{item.pwActlFinishDate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <SpaceRow height={1} />
                                        <div className="flex-row btn">
                                            <div className="flex-col-1">
                                                <FlatButton 
                                                    label={intl.get('QMS.Edit')}
                                                    fullWidth={true}
                                                    labelStyle={{paddingLeft:'0'}}
                                                    onClick={() => this.workPlanDataEdit(item)}
                                                >
                                                    <svg className="icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-edit"></use>
                                                    </svg>
                                                </FlatButton>
                                               
                                            </div>
                                            <SpaceRow height={30} width="1px" backgroundColor="#EEEDED"/>
                                            <div className="flex-col-1">
                                                <FlatButton 
                                                    label={intl.get('QMS.Delete')}
                                                    fullWidth={true}
                                                    labelStyle={{paddingLeft:'0'}}
                                                    onClick={() => this.delItem(item.workPlanID)}
                                                >
                                                    <svg className="icon" aria-hidden="true">
                                                        <use xlinkHref="#icon-del"></use>
                                                    </svg>
                                                </FlatButton>
                                            </div>
                                        </div>
                                        <SpaceRow height={6} width="100%" backgroundColor="#EEEDED"/>
                                    </div>
                                )
                            })
                        }
                    </Scroller>
                </div>
                {/*工作计划弹出*/}
                <Drawer 
                    width="100%" 
                    containerStyle={{top: '48px', overflow: 'hidden'}} 
                    openSecondary={true} 
                    open={this.props.workPlanOpen} 
                >
                    <WorkPlanEdit data={workPlanEditData} parent={this} action={this.state.workPlanAction}/>
                </Drawer>
            </div>
        )
    }
}

export default WorkPlan;