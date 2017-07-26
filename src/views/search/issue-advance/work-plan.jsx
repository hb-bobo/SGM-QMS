import * as React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upWorkPlanListData, upWorkPlanEditData } from '@/store/actions';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';

// import pathToJSON from '@/utils/object/pathToJSON';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import Scroller from '@/components/scroller';
import WorkPlanEdit from './work-plan-edit';
import { POST } from '@/plugins/fetch';
import intl from '@/components/intl';
/*
    planDesc         "描述"
    planFinishDate   "计划完成时间"
    prblmId          "197452"
    prblmPhaseID     "问题阶段"
    rspnsUser        "责任人"
    workPlanID       "101644"
    workPlanStatus   "状态"
*/


@connect(
    // mapStateToProps
    (state) => ({workPlanEditData: state.issueAdvance.workPlanEditData}),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            upWorkPlanEditData,
            upWorkPlanListData
        }, dispatch)
    })
)
class WorkPlan extends React.Component {
    static propTypes = {
        parent: PropTypes.instanceOf(React.Component).isRequired
    }
    
    state = {
        workPlanOpen: false,
        workPlanAction: '',
        workPlan: [],
        allWorkPlan: [],
        phase : [],
        pageNumber: 1,
        filter: ''
    }

    componentDidMount () {
        this.parent = this.props.parent;
        this.selectWorkPlan();
    }
    // 查询工作计划
    selectWorkPlan = () => {
        POST('/mproblem/getWorkPlan', {
        data: {
            id: this.props.prblmId,
            page: this.state.pageNumber
        }
        }).then((res) => {
            if (res.success === true) {
                this.setState({
                    allWorkPlan : res.workplan,
                    phase : res.phase,
                    pageNumber : this.state.pageNumber+1
                });
            }
        })
    }
    // 新增工作计划
    workPlanNewData = () => {
        intl.setMsg(require('@/static/i18n').default, require('./locale'));
        this.setState({
            workPlanOpen: true,
            workPlanAction: 'add'
        });
        // 重置值
        this.props.actions.upWorkPlanEditData({
            value: {}
        });
        this.parent.setState({
            title: intl.get('AddWorkPlan'),
            isIndex: false
        });
    }
    // 编辑工作计划
    workPlanDataEdit = (data) => {
        intl.setMsg(require('@/static/i18n').default, require('./locale'));
        this.setState({
            workPlanOpen: true,
            workPlanAction: 'edit'
        });
        this.props.actions.upWorkPlanEditData({
            value: data
        });
        this.parent.setState({
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
                    this.selectWorkPlan();
                }else{
                    alert("操作失败");
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
        intl.setMsg(require('@/static/i18n').default)
        var allData = this.state.allWorkPlan;
        var phase = this.state.phase;
        var data = allData.filter((item)=>{
            if(this.state.filter === ''){
                return item;
            } else if(item.prblmPhaseID === this.state.filter){
                return item;
            }
            return null;
        })
        var { workPlanEditData } = this.props;

        return (
            <div>
                <SpaceRow height={6} />
                <div className="work-paln-title issue-advance-item-title">
                <span>{intl.get('QMS.WorkingPlan')}</span>
                </div>
                <div className="flex-row issue-advance-item">
                    <div className="flex-col-8">
                        <span>{intl.get('QMS.Step')}: </span>
                        <select name="" id="" style={{marginLeft: '8px'}} onChange={this.changeFilter}>
                            <option value="">{intl.get('QMS.Option')}</option>
                            {phase.map((item, i) => {
                                return (
                                    <option key={i} value={item.prblmPhaseID}>{item.prblmPhaseID}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex-col-2">
                        <svg onClick={this.workPlanNewData} className="icon icon-new" aria-hidden="true">
                            <use xlinkHref="#icon-new"></use>
                        </svg>
                    </div>
                </div>
                <div className="work-plan-list">
                    <Scroller containerHeight={500} bounce={true}>
                        {
                            data.map((item, i) => {
                                return (
                                    <div className="item" key={i}>
                                        <div className="flex-row plan-describe">
                                            <div className="flex-col-9">
                                                <span className="left">
                                                {intl.get('QMS.WorkingPlanDescription')}:
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
                                                        <span>{intl.get('QMS.ECD')}: </span>
                                                        <span className="right">{item.planFinishDate}</span>
                                                    </div>
                                                </div>
                                                <div className="flex-col-1">
                                                    <div>
                                                        <span>{intl.get('QMS.ACD')}: </span>
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
                    open={this.state.workPlanOpen} 
                >
                    <WorkPlanEdit data={workPlanEditData} parent={this} action={this.state.workPlanAction}/>
                </Drawer>
            </div>
        )
    }
}

export default WorkPlan;