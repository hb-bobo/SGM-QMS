import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import ProjectProgress from '@/components/project-progress';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import getProjectQualityList from '@/static/getProjectQualityList.json';
console.log(getProjectQualityList)
class NewProjectQuality extends React.Component {

    static propTypes = {
        goAdvance: PropTypes.func.isRequired
    }
    state = {
        dataSource: []
    }
    componentDidMount () {
        // this.props.actions.fillListData(getProjectQualityList.result)
        this.setState({
            dataSource: getProjectQualityList.result
        });
    }
    
    loadingMore = () => {
        this.setState({
            dataSource: getProjectQualityList.result.concat(this.state.dataSource)
        });
    }
    render () {
        var { goAdvance } = this.props;
        var { dataSource } = this.state;
        intl.setMsg(require('./locale'));
        return (
            <Scroller autoSetHeight={true} loadingMore={this.loadingMore}>
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