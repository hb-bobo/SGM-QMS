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

        // TODO
        var res = {"data":[{"model":"9BLB-MY19","platformProject":"9B","projectPhase":"","projectSchedules":[{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"Y","proType":"Lauch","problemNumber":"","projectPhase":"PPV","projectScheduleID":"","regateTime":{"date":3,"day":1,"hours":0,"minutes":0,"month":6,"seconds":0,"time":1499011200000,"timezoneOffset":-480,"year":117},"subProjectID":"548","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBns","projectScheduleID":"","regateTime":{"date":18,"day":1,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1505664000000,"timezoneOffset":-480,"year":117},"subProjectID":"548","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBs","projectScheduleID":"","regateTime":{"date":27,"day":1,"hours":0,"minutes":0,"month":10,"seconds":0,"time":1511712000000,"timezoneOffset":-480,"year":117},"subProjectID":"548","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"SORP","projectScheduleID":"","regateTime":{"date":5,"day":1,"hours":0,"minutes":0,"month":2,"seconds":0,"time":1520179200000,"timezoneOffset":-480,"year":118},"subProjectID":"548","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"STC","projectScheduleID":"","regateTime":{"date":11,"day":0,"hours":0,"minutes":0,"month":2,"seconds":0,"time":1520697600000,"timezoneOffset":-480,"year":118},"subProjectID":"548","updateBy":"","updateTime":null}],"qualityRisk":" ","subProjectId":"548","timingName":"ALL"},{"model":"D2UB-MY18","platformProject":"Delta","projectPhase":"","projectSchedules":[{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"Y","proType":"Lauch","problemNumber":"","projectPhase":"PPV","projectScheduleID":"","regateTime":{"date":7,"day":2,"hours":0,"minutes":0,"month":2,"seconds":0,"time":1488816000000,"timezoneOffset":-480,"year":117},"subProjectID":"1381","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBns","projectScheduleID":"","regateTime":{"date":19,"day":1,"hours":0,"minutes":0,"month":5,"seconds":0,"time":1497801600000,"timezoneOffset":-480,"year":117},"subProjectID":"1381","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBs","projectScheduleID":"","regateTime":{"date":19,"day":2,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1505750400000,"timezoneOffset":-480,"year":117},"subProjectID":"1381","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"SORP","projectScheduleID":"","regateTime":{"date":11,"day":1,"hours":0,"minutes":0,"month":11,"seconds":0,"time":1512921600000,"timezoneOffset":-480,"year":117},"subProjectID":"1381","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"STC","projectScheduleID":"","regateTime":{"date":18,"day":1,"hours":0,"minutes":0,"month":11,"seconds":0,"time":1513526400000,"timezoneOffset":-480,"year":117},"subProjectID":"1381","updateBy":"","updateTime":null}],"qualityRisk":"W","subProjectId":"1381","timingName":"ALL"},{"model":"E18-MY18","platformProject":"Epsilon","projectPhase":"","projectSchedules":[{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"Y","proType":"Lauch","problemNumber":"","projectPhase":"PPV","projectScheduleID":"","regateTime":{"date":23,"day":4,"hours":0,"minutes":0,"month":2,"seconds":0,"time":1490198400000,"timezoneOffset":-480,"year":117},"subProjectID":"541","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBns","projectScheduleID":"","regateTime":{"date":5,"day":1,"hours":0,"minutes":0,"month":5,"seconds":0,"time":1496592000000,"timezoneOffset":-480,"year":117},"subProjectID":"541","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBs","projectScheduleID":"","regateTime":{"date":14,"day":1,"hours":0,"minutes":0,"month":7,"seconds":0,"time":1502640000000,"timezoneOffset":-480,"year":117},"subProjectID":"541","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"SORP","projectScheduleID":"","regateTime":{"date":9,"day":1,"hours":0,"minutes":0,"month":9,"seconds":0,"time":1507478400000,"timezoneOffset":-480,"year":117},"subProjectID":"541","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"STC","projectScheduleID":"","regateTime":{"date":16,"day":1,"hours":0,"minutes":0,"month":9,"seconds":0,"time":1508083200000,"timezoneOffset":-480,"year":117},"subProjectID":"541","updateBy":"","updateTime":null}],"qualityRisk":"W","subProjectId":"541","timingName":"ALL"},{"model":"K216-MY17","platformProject":"PATAC-K","projectPhase":"","projectSchedules":[{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"Y","proType":"Lauch","problemNumber":"","projectPhase":"PPV","projectScheduleID":"","regateTime":{"date":9,"day":0,"hours":0,"minutes":0,"month":9,"seconds":0,"time":1475942400000,"timezoneOffset":-480,"year":116},"subProjectID":"6502","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"Y","proType":"Lauch","problemNumber":"","projectPhase":"MVBns","projectScheduleID":"","regateTime":{"date":27,"day":2,"hours":0,"minutes":0,"month":11,"seconds":0,"time":1482768000000,"timezoneOffset":-480,"year":116},"subProjectID":"6502","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"Y","proType":"Lauch","problemNumber":"","projectPhase":"MVBs","projectScheduleID":"","regateTime":{"date":18,"day":4,"hours":0,"minutes":0,"month":4,"seconds":0,"time":1495036800000,"timezoneOffset":-480,"year":117},"subProjectID":"6502","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"SORP","projectScheduleID":"","regateTime":{"date":23,"day":1,"hours":0,"minutes":0,"month":9,"seconds":0,"time":1508688000000,"timezoneOffset":-480,"year":117},"subProjectID":"6502","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"STC","projectScheduleID":"","regateTime":{"date":31,"day":2,"hours":0,"minutes":0,"month":9,"seconds":0,"time":1509379200000,"timezoneOffset":-480,"year":117},"subProjectID":"6502","updateBy":"","updateTime":null}],"qualityRisk":"Y","subProjectId":"6502","timingName":"C10T"},{"model":"K221-MY18","platformProject":"PATAC-K","projectPhase":"","projectSchedules":[{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"Y","proType":"Lauch","problemNumber":"","projectPhase":"PPV","projectScheduleID":"","regateTime":{"date":10,"day":3,"hours":0,"minutes":0,"month":4,"seconds":0,"time":1494345600000,"timezoneOffset":-480,"year":117},"subProjectID":"1323","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBns","projectScheduleID":"","regateTime":{"date":19,"day":3,"hours":0,"minutes":0,"month":6,"seconds":0,"time":1500393600000,"timezoneOffset":-480,"year":117},"subProjectID":"1323","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBs","projectScheduleID":"","regateTime":{"date":6,"day":3,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1504627200000,"timezoneOffset":-480,"year":117},"subProjectID":"1323","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"SORP","projectScheduleID":"","regateTime":{"date":23,"day":1,"hours":0,"minutes":0,"month":9,"seconds":0,"time":1508688000000,"timezoneOffset":-480,"year":117},"subProjectID":"1323","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"STC","projectScheduleID":"","regateTime":{"date":23,"day":1,"hours":0,"minutes":0,"month":9,"seconds":0,"time":1508688000000,"timezoneOffset":-480,"year":117},"subProjectID":"1323","updateBy":"","updateTime":null}],"qualityRisk":"Y","subProjectId":"1323","timingName":"ALL"},{"model":"K256-MY18","platformProject":"PATAC-K","projectPhase":"","projectSchedules":[{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"PPV","projectScheduleID":"","regateTime":{"date":12,"day":5,"hours":0,"minutes":0,"month":4,"seconds":0,"time":1494518400000,"timezoneOffset":-480,"year":117},"subProjectID":"1028","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBns","projectScheduleID":"","regateTime":{"date":17,"day":1,"hours":0,"minutes":0,"month":6,"seconds":0,"time":1500220800000,"timezoneOffset":-480,"year":117},"subProjectID":"1028","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"MVBs","projectScheduleID":"","regateTime":{"date":28,"day":4,"hours":0,"minutes":0,"month":8,"seconds":0,"time":1506528000000,"timezoneOffset":-480,"year":117},"subProjectID":"1028","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"SORP","projectScheduleID":"","regateTime":{"date":27,"day":1,"hours":0,"minutes":0,"month":10,"seconds":0,"time":1511712000000,"timezoneOffset":-480,"year":117},"subProjectID":"1028","updateBy":"","updateTime":null},{"createBy":"","createTime":null,"isCrntPhase":"N","openStatus":"N","proType":"Lauch","problemNumber":"","projectPhase":"STC","projectScheduleID":"","regateTime":{"date":4,"day":1,"hours":0,"minutes":0,"month":11,"seconds":0,"time":1512316800000,"timezoneOffset":-480,"year":117},"subProjectID":"1028","updateBy":"","updateTime":null}],"qualityRisk":"Y","subProjectId":"1028","timingName":"ALL"}],"success":true};

        this.setState({
            listData: res.data
        })
    }

    /**
     * go 项目质量验证总览, 目前是只有热点问题
     * path = /project/verification
     */
    goHotIssue = (subProjectId) => {
        this.context.router.history.push('/project/verification/' + subProjectId);
    } 
    render () {
        var { noMoreData, getListData, loadingMore } = this.props;
        var { lang } = this.context;
        var {listData} = this.state;
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
            </SilkScroller>
        )
    }
}

export default NewProjectQuality