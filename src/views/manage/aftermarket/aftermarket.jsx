import * as React from 'react';
import './index.css';
// import { RouteWithSubRoutes } from '@/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { Accordion } from 'antd-mobile';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import EchartGauge from '@/components/echarts/echart-gauge';
import EchartPie from '@/components/echarts/echart-pie';
import EchartLine from '@/components/echarts/echart-line';
import Scroller from '@/components/scroller';
import intl from '@/components/intl';
import { GET } from '@/plugins/fetch';

/*售后质量*/

class QualityAfterSaleReport extends React.Component {
    state = {
        title: intl.get('QMS.aftermarket'),
        isIndex: true,
        chart60Value: 0,
        chart95Value: 0,
        totalData: [], // 区域图
        IPTV12_YEAR: "MY",
        IPTV24_YEAR: "MY",
        CPV12_YEAR: "MY",
        CPV24_YEAR: "MY",
        IPTV12_DATA: [],
        IPTV24_DATA: [],
        CPV12_DATA: [],
        CPV24_DATA: [],
    }

    /*back*/
    goBack = () => {
        this.props.history.go(-1);
        if (this.props.match.path === '/manage/quality-after-sale') {
            this.setState({
                isIndex: true
            });
        }
    }
    componentDidMount () {
        this.setState({
            title: intl.get('QMS.aftermarket')
        });

        //pie图  {"count":5,"spillKpi":"11","success":true}
         GET('/ProjectQuality/mGetSpillCount')
        .then((res) => {
            if (res.success === true) {
                // 
                this.setState({
                    pieData: [{value: res.count},{value: res.spillKpi}],
                });
            }
        }); 
        
        /*仪表盘左 {"queryTwoCount":20,"queryCount":38,"queryOneCount":14,"success":true}*/
        GET('/ProjectQuality/mQueryCount')
        .then((res) => {
            if (res.success === true) {
                this.setState({
                    chart60Value: Math.round(res.queryOneCount / res.queryCount * 100),
                    chart95Value: Math.round(res.queryTwoCount / res.queryCount * 100),
                });
            }
        });

        /* 4个线图 */
        GET('/ProjectQuality/mQueryTarget')
        .then((res) => {
            if (res.success === true) {
                var data = res.data;
                this.setState({
                    IPTV12_DATA: handleLineData(data.iptvTwelve),
                    IPTV24_DATA: handleLineData(data.iptvTwentyFour),
                    CPV12_DATA: handleLineData(data.cpvTwelve),
                    CPV24_DATA: handleLineData(data.cpvTwentyFour)
                });
                // 怕后台不返数据给我, 所以做个判断
                if (
                    data.iptvTwelve[0] !== undefined &&
                    data.iptvTwentyFour[0] !== undefined &&
                    data.cpvTwelve[0] !== undefined &&
                    data.cpvTwentyFour[0] !== undefined
                ) {
                    this.setState({
                        IPTV12_YEAR: data.iptvTwelve[0].year,
                        IPTV24_YEAR: data.iptvTwentyFour[0].year,
                        CPV12_YEAR: data.cpvTwelve[0].year,
                        CPV24_YEAR: data.cpvTwentyFour[0].year,
                    });
                }
            }
            
        });

        
        /* 区域线图 */
        // var data = {"problemHotCount":2,"totalCount":[{"TOTALCOUNT":3,"HOTCOUNT":2,"MONTH":1},{"TOTALCOUNT":5,"HOTCOUNT":1,"MONTH":2},{"TOTALCOUNT":7,"HOTCOUNT":0,"MONTH":3},{"TOTALCOUNT":11,"HOTCOUNT":1,"MONTH":5},{"TOTALCOUNT":12,"HOTCOUNT":1,"MONTH":6}],"problemTotalCount":14,"success":true}

        GET('/ProjectQuality/mGetAftersaleProblemList')
        .then((res) => {
            if (res.success === true) {
                this.setState({
                    totalData: handleAreaLineData(res.totalCount)
                });
            }
        });
    }
    render () {
        intl.setMsg(require('@/static/i18n').default)
        return (
            <div>
                {/*头部*/}
                <AppBar
                    title={this.state.title}
                    titleStyle={{textAlign: 'center'}}
                    iconElementLeft={
                        <IconButton onClick={this.goBack}>
                            <NavigationArrowBack color={'#FFF'}/>
                        </IconButton>
                    }
                    iconElementRight={
                        <span style={{display: 'inline-block', width: '2.6em'}}></span>
                    }   
                />
                <Scroller
                    autoSetHeight={true}
                    bottomHeight={-15}
                    bounce={false}
                >
                    {/*顶部*/}
                    <div className="chat1">
                        <div className="chat1_piechat">
                            <EchartPie info={this.state.pieData}></EchartPie>
                        </div>
                        <div className="chat1_instrumentchat1">
                            <EchartGauge
                                value={this.state.chart60Value}
                                lineStyleColor={ [[0.5,"red"], [0.6,"#5bd0f9"], [1,"#60ed92"]] }
                            />
                        </div>
                        <div className="chat1_instrumentchat2">
                            <EchartGauge
                                value={this.state.chart95Value}
                                lineStyleColor={ [[0.8,"red"], [0.95,"#5bd0f9"], [1,"#60ed92"]] }
                            />
                        </div>
                        <span className="left_instrument_span">售后问题在库时间比例60%</span>
					    <span className="right_instrument_span">售后问题在库时间比例95%</span>
                    </div>
                    
                    <div>
                         <EchartLine
                            series={this.state.totalData}
                            color={ ['rgb(219, 40, 36)', 'yellow'] }
                            yFormat="{value}"
                            showLegend={true}
                            legendData={ ['Hot Issues', 'Open Issues'] }
                            style={{height: "200px",  width: "100%"}}
                        /> 
                    </div>

                    <Accordion defaultActiveKey="-1" className="chart-list">
                        <Accordion.Panel header={`${this.state.IPTV12_YEAR} 12MIS IPTV`}>
                            <EchartLine
                                series={this.state.IPTV12_DATA}
                            />
                        </Accordion.Panel>
                        <Accordion.Panel header={`${this.state.IPTV24_YEAR} 24MIS IPTV`}>
                             <EchartLine 
                                series={this.state.IPTV24_DATA}
                                
                            /> 
                        </Accordion.Panel>
                        <Accordion.Panel header={`${this.state.CPV12_YEAR} 12MIS CPV`}>
                             <EchartLine 
                                series={this.state.CPV12_DATA}
                                
                            /> 
                        </Accordion.Panel>
                        <Accordion.Panel header={`${this.state.CPV24_YEAR} 24MIS CPV`}>
                             <EchartLine 
                                series={this.state.CPV24_DATA}
                                
                            /> 
                        </Accordion.Panel>
                    </Accordion>  
                </Scroller>
            </div>
        )
    }
    
}

/**
 * 处理line chart 数据
 * @param {array}
 * @return {array} series
 */
var handleLineData = function (resData) {
    var LineSeries = [
        {
            name: "目标值",
            type: "line",
            data: []
        },
        {
            name: "实际值",
            type: "line",
            label: {
                normal: {
                    show: true
                }
            },
            data: []
        }
    ];
    // 目标值都是一样，取target
    if (resData[0] !== undefined) {
        var item = resData[0];
        for (let i = 0; i < 12; i++) {
            LineSeries[0].data.push(item.target)
        }
    }
    // 先把12个月填控
    for (let i = 0; i < 12; i++) {
        LineSeries[1].data.push('')
    }
    Array.isArray(resData) && resData.forEach(function (item, i) {
        //把month可能只有一个
        LineSeries[1].data[item.month - 1] = item.actual
    });
    return LineSeries;
}
/**
 * 处理区域线图 数据
 * @param {array}
 * @return {array} series
 */
var handleAreaLineData = function (resData) {
    var linStyle = {
        normal: {
            opacity: 0
        }
    }
    var LineSeries = [
        {
            name: "Hot Issues",
            type: "line",
            stack: '总量',
            areaStyle: {
                normal: {
                    color: 'rgb(219, 40, 36)'
                }
            },
            lineStyle: linStyle,
            data: []
        },
        {
            name: "Open Issues",
            type: "line",
            stack: '总量',
            areaStyle: {
                normal: {
                    color: 'yellow'
                }
            },
            lineStyle: linStyle,
            data: []
        }
    ];
    // 先把12个月填控
    for (let i = 0; i < 12; i++) {
        LineSeries[0].data.push('');
        LineSeries[1].data.push('');
    }
    Array.isArray(resData) && resData.forEach(function (item, i) {
        //把month可能只有一个，且分开
        var month = item.MONTH - 1;
        LineSeries[0].data[month] = item.HOTCOUNT
        LineSeries[1].data[month] = item.TOTALCOUNT
    });
    return LineSeries;
}
export default QualityAfterSaleReport;