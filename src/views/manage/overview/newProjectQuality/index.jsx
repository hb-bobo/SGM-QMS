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
        router: PropTypes.object,
        language: PropTypes.string	
    }
    state = {
        dataSource: [],
        scrollConfig: {
            upContent: ''
        },
        page: 1,
    }
    componentDidMount () {
        // this.props.actions.fillListData(getProjectQualityList.result)
        this.refresh();
        isMounted = true;
    }
    componentWillUnmount () {
        isMounted = null
    }
    loadingMore = () => {
    
        if (this.state.scrollConfig.upContent === 'No More') {
            // 上拉结束
            this.refs.scroller.donePullup();
            return;
        }
        setTimeout(() => {
            if (isMounted === null) {return;}
            this.setState({
                dataSource: getProjectQualityList.result.concat(this.state.dataSource),
                scrollConfig: {
                    upContent: 'No More'
                },
                fetchStatus: true
            });
            // 上拉结束
            this.refs.scroller.donePullup();
        }, 500);
    }
    refresh = () => {

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
            // 下拉结束
            this.refs.scroller.donePulldown();
        })*/
        setTimeout(() => {
            if (isMounted === null) {return;}
            this.setState({
                dataSource: getProjectQualityList.result,
                scrollConfig: {
                    upContent: ''
                },
                page: 1,
                fetchStatus: true
            });
            // 下拉结束
            this.refs.scroller.donePulldown();
        }, 500)
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
        var { lang } = this.context;
        // timingName的样式，中英文差距大
        var timingNameStyle = lang === 'zh' ? {} : {float: 'right', marginRight: '8px'};
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
                                    <span>{intl.get('platform')}:</span>
                                    <span> {item.platformProject}</span>
                                </div>
                                <div className="flex-col-5">
                                    <div className="flex-row">
                                        <div className={lang === 'zh' ? "flex-col-2" : 'flex-col-3'}>
                                            <span>{intl.get('project')}:</span>
                                            <span> {item.model}</span>
                                        </div>
                                        <div className="flex-col-1">
                                            <span  style={timingNameStyle}> {item.timingName}</span>
                                        </div>
                                    </div>
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