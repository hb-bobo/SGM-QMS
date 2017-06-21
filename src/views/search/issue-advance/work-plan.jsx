import * as React from 'react';
import { Link } from 'react-router-dom';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import Scroller from '@/components/scroller';

class WorkPlan extends React.Component {
    static defaultProps = {

    }

    render () {
        var data = this.props.workPlanData;
        return (
            <div>
                <SpaceRow height={6} />
                <div className="work-paln-title issue-advance-item-title">
                <span>工作计划</span>
                </div>
                <div className="flex-row issue-advance-item">
                    <div className="flex-col-8">
                        <span>阶段</span>
                    </div>
                    <div className="flex-col-2">
                        <Link to="/search/issue-advance/edit/add">
                        <button>新增</button>
                        </Link>
                    </div>
                </div>
                <div className="work-plan-list">
                    <Scroller containerHeight={500}>
                        {
                            data.map((item, i) => {
                                return (
                                    <div className="item" key={i}>
                                        <div className="flex-row">
                                            <div className="flex-col-9">
                                                <span>
                                                计划描述:
                                                </span>
                                                <span>
                                                {item.planDesc}
                                                </span>
                                            </div>
                                            <div className="flex-col-1">
                                                <Circle value={item.workPlanStatus}/>
                                            </div>
                                        </div>
                                        <div className="flex-row">
                                            <div className="flex-col-1">
                                                <div>
                                                    <span>责任人: </span>
                                                    <span>{item.rspnsUser}</span>
                                                    </div>
                                                <div>
                                                    <span>计划完成时间: </span>
                                                    <span>{item.planFinishDate}</span>
                                                </div>
                                            </div>
                                            <div className="flex-col-1">
                                                <div>
                                                    <span>问题阶段: </span>
                                                    <span>{item.prblmPhaseID}</span>
                                                </div>
                                                <div>
                                                    <span>实际完成时间: </span>
                                                    <span>{item.xx}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-row">
                                            <div className="flex-col-1">
                                                <Link to="/search/issue-advance/edit/edit">编辑</Link>
                                            </div>
                                            <div className="flex-col-1">
                                                <button>删除</button>
                                            </div>
                                        </div>
                                        <SpaceRow height={6} />
                                    </div>
                                )
                            })
                        }
                    </Scroller>
                </div>
            </div>
        )
    }
}

export default WorkPlan