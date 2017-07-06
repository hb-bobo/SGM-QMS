import * as React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fillListData } from '@/store/actions';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';

import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import HotIssueEdit from './edit';

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
class HotIssueApprove extends React.Component {
    static defaultProps = {
        listData: []
    }
    static propTypes = {
        listData: PropTypes.array,
        goAdvance: PropTypes.func
    }
    state = {
        hotIssueEditOpen: false,
        list: [],
        hotIssueEditData: {}
    }
    componentWillMount () {
       this.setState({
            list: this.$store.getState().common.listData
       });
    }
    
    componentDidMount () {
        var data = require('@/static/workPlan.json').result
        this.$store.dispatch(fillListData(data))
    }
    // Go to Advance page
    goAdvance = (advanceType) => {
        this.props.goAdvance('/search/issue-advance/' + advanceType);
    }
    // edit review time
    edit (data) {
        console.log(data)
        this.setState({
            hotIssueEditOpen: true,
            hotIssueEditData: data,
            title: '修改评审时间',
            isIndex: false
        });
        return false
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
        var { listData } = this.props;
        intl.setMsg(require('./locale').default);
        return (
            <div className="gtasks-list">
                {
                    listData.map((item, i) => {
                        return (
                            <div className="item" key={i}>
                                <div className="flex-row item-top">
                                    <div className="flex-col-9">
                                        <div>
                                            <span 
                                                style={{color: 'rgb(106, 196, 246)', marginBottom: '4px'}}
                                                onClick={() => this.goAdvance('PRTS')}
                                            >
                                               {item.prblmId}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="left">
                                            {intl.get('platform')}计划描述:
                                            </span>
                                            <span className="right">
                                                {item.planDesc}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-col-1">
                                        <Circle value={item.workPlanStatus}/>
                                    </div>
                                </div>
                                <div className="item-body">
                                    <div className="flex-row">
                                        <div className="flex-col-1">
                                            <div>
                                                <span>评审等级: </span>
                                                <span className="right">{item.rspnsUser}</span>
                                            </div>
                                        </div>
                                        <div className="flex-col-1">
                                            <div className="review-time">
                                                <span>评审时间: </span>
                                                <span>{item.planFinishDate}</span>
                                                <span className="review-time-edit" onClick={() => this.edit(item)}>
                                                    <svg className="icon icon-edit1" aria-hidden="true">
                                                        <use xlinkHref="#icon-edit1"></use>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-1">
                                            <div>
                                                <span>在库时间: </span>
                                                <span className="right">{item.planFinishDate}</span>
                                            </div>
                                        </div>
                                        <div className="flex-col-1">
                                            <div>
                                                <span>责 任 人: </span>
                                                <span className="right">{item.xx}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-row">
                                        <div className="flex-col-1">
                                            <div>
                                                <span>项目名称: </span>
                                                <span className="right">{item.planFinishDate}</span>
                                            </div>
                                        </div>
                                        <div className="flex-col-1">
                                            <div>
                                                <span>责任部门: </span>
                                                <span className="right">{item.xx}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-1">
                                            <div>
                                                <span>问题等级: </span>
                                                <span className="right">{item.planFinishDate}</span>
                                            </div>
                                        </div>
                                        <div className="flex-col-1">
                                            <div>
                                                <span>问题阶段: </span>
                                                <span className="right">{item.xx}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-1">
                                            <div>
                                                <span>上升理由: </span>
                                                <span className="right">{item.planFinishDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-row btn">
                                    <div className="flex-col-1">
                                        <FlatButton 
                                            label="批准" 
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
                                            label="驳回" 
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
                {/*edit弹出*/}
                <Drawer 
                    width="100%" 
                    containerStyle={{top: '48px', overflow: 'hidden'}} 
                    openSecondary={true}
                    parent={this}
                    open={this.state.hotIssueEditOpen} 
                >
                    <HotIssueEdit data={this.state.hotIssueEditData} parent={this}/>
                </Drawer>
            </div>
        )
    }
}

export default HotIssueApprove;