import * as React from 'react';
//import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import List from '@/components/list';
import Scroller from '@/components/scroller';

/*
    "projectName"            项目名称：K256-MY18,
    "prblmNo"                问题编号: EIR-R-K25-61-EAIR-0005
    "problemDesc"            问题标题: 外后视镜只能小角度折叠
    "prblmServertiy"         等级: 4
    "currentStatus"          状态: w
    "crntPhase"              问题阶段: Feedback
    "responsibleDept"        责任部门: HE
    "name"",                 责任人  : 彭昊Peng Hao
    "reviewDates"06-02",     评审时间: 2017-06-02
    "reviewLevel"            评审级别: EQR专题
    "reviewOp"               审批状态: 待审批
*/
class ItemList extends React.Component {
    state = {
        advanceType: 'PRTS'
    }
    /*返回详情内容*/
    details = (item) => {
        return (
            <div>
                <ul className="details-list">
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">项目名称:</span>
                            <span className="flex-col-7">{item.projectName}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">问题编号:</span>
                            <span className="flex-col-7">{item.prblmNo}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">问题标题:</span>
                            <span className="flex-col-7">{item.problemDesc}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">等级:</span>
                            <span className="flex-col-7">{item.prblmServertiy}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">状态:</span>
                            <span className="flex-col-7">{item.currentStatus}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">问题阶段:</span>
                            <span className="flex-col-7">{item.crntPhase}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">责任部门:</span>
                            <span className="flex-col-7">{item.responsibleDept}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">责任人:</span>
                            <span className="flex-col-7">{item.name}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">评审时间:</span>
                            <span className="flex-col-7">{item.reviewDates}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">评审级别:</span>
                            <span className="flex-col-7">{item.reviewLevel}</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex-row">   
                            <span className="flex-col-3 details-item-left">审批状态:</span>
                            <span className="flex-col-7">{item.reviewOp}</span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
    /*包一层方便判断*/
    goAdvance = () => {
        if (typeof this.props.goAdvance === 'function') {
            this.props.goAdvance('/search/issue-advance/' + this.state.advanceType);
        }
    }
    render () {
        var { dataSource } = this.props;
        return (
            <Scroller autoSetHeight={true} >
                {dataSource.map((item, i) => {
                    return (
                        <List key={i} details={this.details(item)}>
                            <div className="flex-row">
                                <div className="flex-col-2 text-center">
                                    {item.currentStatus}
                                </div>
                                <div className="flex-col-13 item-title-center" onClick={this.goAdvance}>
                                    <div className="flex-row">
                                        <span className="flex-col-1">项目名称:{item.projectName}</span>
                                        <span className="flex-col-1">评审时间:{item.reviewDates}</span>
                                    </div>
                                    <div className="flex-row">
                                        <span className="flex-col-1">责任人:{item.name}</span>
                                    </div>
                                </div>
                                <div className="flex-col-2 text-center">
                                    <IconMenu
                                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                        targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                        >
                                        <MenuItem primaryText="热点上升申请" />
                                        <MenuItem primaryText="问题上升申请" />
                                    </IconMenu>
                                </div>
                            </div>
                            <div className="item-content" onClick={this.goAdvance}>
                                {item.problemDesc}
                            </div>
                        </List>
                    )
                })}
            </Scroller>
                
        )
    }
}

export default ItemList