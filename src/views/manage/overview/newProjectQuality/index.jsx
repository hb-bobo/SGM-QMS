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

    /*static propTypes = {
        goAdvance: PropTypes.func.isRequired
    }*/
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        dataSource: [],
        scrollConfig: {
            downContent: 'Loading More'
        }
    }
    componentDidMount () {
        // this.props.actions.fillListData(getProjectQualityList.result)
        this.setState({
            dataSource: getProjectQualityList.result
        });
    }
    
    loadingMore = () => {
        if (this.state.scrollConfig.downContent === 'No More') {
            return;
        }
        this.setState({
            dataSource: getProjectQualityList.result.concat(this.state.dataSource),
            scrollConfig: {
                downContent: 'No More'
            }
        });

    }
    /**
     * go 项目质量验证总览, 目前是只有热点问题
     * path = /project/verification
     */
    goHotIssue = () => {
        this.context.router.history.push('/project/verification')
    } 
    render () {
        // var { goAdvance } = this.props;
        var { dataSource } = this.state;
        intl.setMsg(require('./locale'));
        return (
            <Scroller
                autoSetHeight={true}
                onPullupLoading={this.loadingMore}
                config={this.state.scrollConfig}
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
                                <div className="flex-col-1" onClick={() => {this.goHotIssue('EIR')}}>
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