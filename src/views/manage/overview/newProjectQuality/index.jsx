import * as React from 'react';
import PropTypes from 'prop-types';

import fetchList from '@/decorator/fetchList';
import SilkScroller from '@/components/silk-scroller';
import ProjectProgress from '@/components/project-progress';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
// import Access from '@/components/Access';
// import AppConfig from '@/AppConfig';
// import { POST } from '@/plugins/fetch';

/*新项目质量总览*/
@fetchList('/ProjectQuality/mGetNewProjectList')
class NewProjectQuality extends React.Component {
    static defaultProps = {
    }
    static propTypes = {
        setListData: PropTypes.func,
        getListData: PropTypes.func,
        loadingMore: PropTypes.func,
    }
    static contextTypes = {	
        router: PropTypes.object,
        language: PropTypes.string	
    }
    
    state = {
    }
    componentDidMount () {
        // this.props.actions.fillListData(getProjectQualityList.result)
        // this.props.getListData('down');
        this.refs.scroller.simulatePullRefresh();
    }

    /**
     * go 项目质量验证总览, 目前是只有热点问题
     * path = /project/verification
     */
    goHotIssue = (subProjectId) => {
        this.context.router.history.push('/project/verification/' + subProjectId);
    } 
    render () {
        var { noMoreData, getListData, loadingMore, listData } = this.props;
        var { lang } = this.context;
        // timingName的样式，中英文差距大
        var timingNameStyle = lang === 'zh' ? {} : {float: 'right', marginRight: '8px'};
        return (
            <SilkScroller
                usePullRefresh
                pullRefreshAction={(resolve, reject) => {getListData('down', resolve, reject)}}
                useLoadMore
                loadMoreAction={(resolve, reject) => loadingMore(resolve, reject)}
                noMoreData={noMoreData}
                preventDefault={false}
                ref="scroller"
            >
                <div>
                    {listData && listData.map((item, i) => {
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
                                    <div className="flex-col-1" onClick={() => {this.goHotIssue(item.subProjectId)}}>
                                        <Circle value={item.qualityRisk}></Circle>
                                    </div>
                                </div>
                                <div className="item-project-progress">
                                    <ProjectProgress projectSchedules={item.projectSchedules}></ProjectProgress>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SilkScroller>
        )
    }
}

export default NewProjectQuality