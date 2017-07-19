import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import ProjectProgress from '@/components/project-progress';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import AppConfig from '@/AppConfig';
import { POST } from '@/plugins/fetch';
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
        listData: [],
        scrollConfig: {
            upContent: ''
        },
        pageNumber: 1,
    }
    componentDidMount () {
        // this.props.actions.fillListData(getProjectQualityList.result)
        this.refresh('down');
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
        this.refresh('up');
    }
    /**
     * @param {'up' | 'down'} 上拉还是下拉
     */
    refresh = (action) => {
        
        if (action === 'down') {
            this.setState({
                pageNumber: 1,
                scrollConfig: {
                    upContent: ''
                }
            });
        }
        // AppConfig.listConfig.count 每次加多少条
        POST('/newProjectQuality/PchotIssueNotice', {
            data: {
                "empId": "P0892",
                "pageSize": AppConfig.listConfig.count,
                "pageNumber": this.state.pageNumber,
                "positNum": 'A3010274'
            },
        })
        .then((res) => {
            if (isMounted === null) {return;}
            
            if (res.success === true) {
                var listData;
                
                // 刷新直接赋值，加载更多要保留原来的数据
                // 下拉结束
                if (action === 'down') {
                    this.refs.scroller.donePulldown();
                    listData = res.data;
                } else if (action === 'up') {
                    // 上拉结束
                    console.log('上啦结束')
                    this.refs.scroller.donePullup();
                    listData = this.state.listData.concat(res.data);
                }
                this.setState({
                    listData: listData,
                    pageNumber: this.state.pageNumber + 1,
                });
                // 最后的数据
                if (res.data.length < AppConfig.listConfig.count) {
                    this.setState({
                        scrollConfig: {
                            upContent: 'No More'
                        }
                    });
                }
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
        var { listData } = this.state;
        intl.setMsg(require('./locale'));
        var { lang } = this.context;
        // timingName的样式，中英文差距大
        var timingNameStyle = lang === 'zh' ? {} : {float: 'right', marginRight: '8px'};
        return (
            <Scroller
                autoSetHeight={true}
                onPullupLoading={this.loadingMore}
                onPulldownLoading={() => this.refresh('down')}
                config={this.state.scrollConfig}
                ref="scroller"
            >
                {listData.map((item, i) => {
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