import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import ProjectProgress from '@/components/project-progress';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import getProjectQualityList from '@/static/getProjectQualityList.json';

class NewProjectQuality extends React.Component {

    static propTypes = {
        goAdvance: PropTypes.func.isRequired
    }
    state = {
        dataSource: [],
        scrollConfig: {
            upContent: ''
        },
        done: false
    }
    componentDidMount () {
        // this.props.actions.fillListData(getProjectQualityList.result)
        this.refresh();
    }
    
    loadingMore = () => {
        if (this.state.scrollConfig.upContent === 'No More') {
            this.refs.scroller.donePullup();
            return;
        }
        setTimeout(() => {
            this.setState({
                dataSource: getProjectQualityList.result.concat(this.state.dataSource),
                scrollConfig: {
                    upContent: 'No More'
                }
            });
            this.refs.scroller.donePullup();
        }, 1000)
        

    }
    refresh = () => {
        setTimeout(() => {
            this.setState({
                dataSource: getProjectQualityList.result,
                scrollConfig: {
                    upContent: ''
                }
            });
            this.refs.scroller.donePulldown();
        }, 1000)
    }

    render () {
        var { goAdvance } = this.props;
        var { dataSource } = this.state;
        intl.setMsg(require('./locale'));
        return (
            <Scroller
                autoSetHeight={true}
                onPullupLoading={this.loadingMore}
                onPulldownLoading={this.refresh}
                config={this.state.scrollConfig}
                ref="scroller"
            >
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