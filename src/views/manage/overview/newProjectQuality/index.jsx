import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import ProjectProgress from '@/components/project-progress';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';


const NewProjectQuality = (props) => {
    var { dataSource, goAdvance } = props;
    return (
        <Scroller autoSetHeight={true} >
            {dataSource.map((item, i) => {
                return (
                    <div key={i} >
                        <SpaceRow height="0.4em"/>
                        <div className="item-top flex-row">
                            <div className="flex-col-4">
                                <span>平台: </span>
                                <span> {item.platformProject}</span>
                            </div>
                            <div className="flex-col-5">
                                <span>项目: </span>
                                <span> {item.model}</span>
                            </div>
                            <div className="flex-col-1" onClick={() => {goAdvance('QDCPIR')}}>
                                <Circle value={item.qualityRisk}></Circle>
                            </div>
                        </div>
                        <div className="item-project-progress">
                            <ProjectProgress projectSchedules={item.projectSchedules}></ProjectProgress>
                        </div>
                    </div>
                )
            })}
        </Scroller>
    )
}

export default NewProjectQuality