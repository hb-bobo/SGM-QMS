import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import ProjectProgress from '@/components/project-progress';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

class NewProjectQuality extends React.Component {
    static defaultProps = {
        dataSource: []
    }
    static propTypes = {
        dataSource: PropTypes.array,
        goAdvance: PropTypes.func.isRequired
    }
    
    render () {
        var { dataSource, goAdvance } = this.props;
        intl.setMsg(require('./locale'));
        return (
            <Scroller autoSetHeight={true} >
                {dataSource.map((item, i) => {
                    return (
                        <div key={i} >
                            <SpaceRow height="0.4em"/>
                            <div className="item-top flex-row">
                                <div className="flex-col-4">
                                    <span>{intl.get('platform')}: </span>
                                    <span> {item.platformProject}</span>
                                </div>
                                <div className="flex-col-5">
                                    <span>{intl.get('project')}: </span>
                                    <span> {item.model}</span>
                                </div>
                                <div className="flex-col-1" onClick={() => {goAdvance('EIR')}}>
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
}

export default NewProjectQuality