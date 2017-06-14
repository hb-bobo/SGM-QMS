import * as React from 'react';
//import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import ProjectProgress from '@/components/project-progress';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
/*
    platformProject: 平台
    "prjctId": 108724,
    "SUB_PRJCT_ID": 548,
    "timingName": 子项目,
    "prjctName": 项目,
    "progress": 项目进度
    qualityRisk: 质量风险
    "prjctChangeLevel": "New",
    "prtsPrjctNo": "9BLB 2019,Y,"

*/

const NewProjectOverviewItemList = (props) => {
    var { dataSource } = props;
    console.log()
    return (
        <Scroller autoSetHeight={true} >
            {dataSource.map((item, i) => {
                return (
                    <div key={i} >
                        <SpaceRow height="0.4em"/>
                        <div className="item-top flex-row">
                            <div className="flex-col-4">
                                <span>平台: </span>
                                <span> {item.prtsPrjctNo}</span>
                            </div>
                            <div className="flex-col-5">
                                <span>项目: </span>
                                <span> {item.prjctName}</span>
                            </div>
                            <div className="flex-col-1">
                                <Circle value={item.pqrrStatus}></Circle>
                            </div>
                        </div>
                        <div className="item-project-progress">
                            <ProjectProgress projectSchedules={item.progress}></ProjectProgress>
                        </div>
                    </div>
                )
            })}
        </Scroller>
    )
}

export default NewProjectOverviewItemList