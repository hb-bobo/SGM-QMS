import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import ProjectProgress from '@/components/project-progress';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
// import AppConfig from '@/AppConfig';
// import { POST, GET } from '@/plugins/fetch';
import getProjectQualityList from '@/static/getProjectQualityList.json';

// 当请求进行中，组件却被卸载了。跟据此变量判断是否继续
var isMounted = true;

/*新项目质量总览*/

class NewProjectQuality extends React.Component {
    static contextTypes = {		
        router: PropTypes.object		
    }
    state = {
        dataSource: [],
        scrollConfig: {
            upContent: ''
        },
        fetchStatus: true,
        page: 1,
        isMounted: true
    }
    componentDidMount () {
        // this.props.actions.fillListData(getProjectQualityList.result)
        this.refresh();
    }
    componentWillUnmount () {
        isMounted = null
    }
    loadingMore = () => {
        // 防止多次触发
        if (!this.state.fetchStatus) {
            return;
        }
        this.setState({
            fetchStatus: false
        });

        if (this.state.scrollConfig.upContent === 'No More') {
            this.refs.scroller.donePullup();
            return;
        }
        setTimeout(() => {
            if (isMounted === null) {return;}
            this.setState({
                dataSource: getProjectQualityList.result.concat(this.state.dataSource),
                scrollConfig: {
                    upContent: 'No More'
                }
            });
            this.refs.scroller.donePullup();
        }, 10000);
    }
    refresh = () => {
        // 防止多次刷新
        if (!this.state.fetchStatus) {
            return;
        }
        this.setState({
            fetchStatus: false
        });
        // AppConfig.listConfig.count 每次加多少条
        /*GET('/getData', {
            data: {
                "path": "getProjectQualityList.json"
            },
        })
        .then((res) => {
            if (isMounted === null) {return;}
            this.setState({
                dataSource: res.result,
                scrollConfig: {
                    upContent: ''
                },
                page: 1,
                fetchStatus: true
            });
            this.refs.scroller.donePulldown();
        })*/
        setTimeout(() => {
            if (isMounted === false) {return;}
            this.setState({
                dataSource: getProjectQualityList.result,
                scrollConfig: {
                    upContent: ''
                },
                page: 1,
                fetchStatus: true
            });
            this.refs.scroller.donePulldown();
        }, 1000)
    }
    /**
     * go 项目质量验证总览, 目前是只有热点问题
     * path = /project/verification
     */
    goHotIssue = () => {
        this.context.router.history.push('/project/verification')
    } 
    render () {
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
                                <div className="flex-col-1" onClick={() => {this.goHotIssue()}}>
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