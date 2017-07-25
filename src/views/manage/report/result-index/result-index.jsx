import * as React from 'react';
import EchartLine from '@/components/echarts/echart-line';
import { Accordion } from 'antd-mobile';
import { POST } from '@/plugins/fetch';
import dateFormat from '@/utils/format/dateFormat';
// 当前月
var currMounth = new Date().getMonth();
/* 质量月报->结果指标 */
class ResultIndex extends React.Component {
    state = {
        time: dateFormat('yyyy-MM'),
        PRTS60_DATA: [],
        PRTS95_DATA: [],
        EIR_DATA: [],
        AftersalesIssue60_DATA: [],
        AftersalesIssue95_DATA: [],
        QualitySpill_DATA: [],
        IPTV12_DATA: [],
        IPTV24_DATA: [],
        CPV12_DATA: [],
        CPV24_DATA: [],
    }

    componentDidMount () {
        // stateKey 是state上用来setState用的，其他字段是传到后台的
        /* PRTS 和 Aftersales issue */
        var PRTS_params = [
            {
                kpiName: 'PRTS60',
                stateKey: 'PRTS60_DATA',
                uploadType: 'PRTS60',
                type: 'PRTS60',
                codeType: null
            },
            {
                kpiName: 'PRTS95',
                stateKey: 'PRTS95_DATA',
                uploadType: 'PRTS95',
                type: 'PRTS95',
                codeType: null
            },
            {
                kpiName: 'AI60',
                stateKey: 'AftersalesIssue60_DATA',
                uploadType: 'AS60',
                type: 'AS60',
                codeType: null
            },
            {
                kpiName: 'AI95',
                stateKey: 'AftersalesIssue95_DATA',
                uploadType: 'AS95',
                type: 'AS95',
                codeType: null
            }, 
        ];
        
        /* 递归取目标值 */
        var getChartData = (index) => {
            POST('/monthReport/mGetMonthReport', {
                data: {
                    kpiName: PRTS_params[index].kpiName,
                    kpiYear: this.state.time,
                    uploadType: PRTS_params[index].uploadType,
                    type:  PRTS_params[index].type,
                    codeType: PRTS_params[index].codeType
                }
            }).then((res) => {
                if (res.success === true) {
                    var actualValue = res.resultPrtsAndAi;;
                    this.setState({
                        [PRTS_params[index].stateKey]: handleLineData(res.data, actualValue)
                    });
                }
                // 存在就继续
                if (PRTS_params[index + 1] !== undefined) {
                    getChartData(++index);
                }
            }).catch((error) => {
                // 错了还得继续 && 存在就继续
                if (PRTS_params[index + 1] !== undefined) {
                    getChartData(++index);
                }
            });
        }
        getChartData(0);

        /*EIR */
        var EIR_param = {
            kpiName: 'EIR',
            kpiYear: this.state.time,
            uploadType: 'EIR',
            type: 'EIR',
            codeType: null
        };
        POST('/monthReport/mGetMonthReport', {
            data: EIR_param
        }).then((res) => {
            if (res.success === true) {
                var actualValue = JSON.parse(res.Eirresult).COUNT;
                this.setState({
                    EIR_DATA: handleLineData(res.data, arrToArr(actualValue), true)
                });
            }

        }).catch((error) => {

        });

        /* Quality spill */
        var SPILL_param = {
            kpiName: 'SPILL',
            kpiYear: this.state.time,
            uploadType: null,
            type: null,
            codeType: null
        };
        POST('/monthReport/mGetMonthReport', {
            data: SPILL_param
        }).then((res) => {
            if (res.success === true) {
                var actualValue = JSON.parse(res.qualitySpillResult).COUNT;
                var value = 0;
                // 累加处理
                actualValue = actualValue.map(function (item) {
                    value += item;
                    return value
                });
                // 数据不够长，得补全到当月 - 1
                var len = (currMounth + 1) - actualValue.length;
                if (len > 0) {
                    for(let i = 0; i < len; i++) {
                        actualValue.push(value);
                    }
                }
                this.setState({
                    'QualitySpill_DATA': handleLineData(res.data, arrToArr(actualValue), true)
                });
            }

        }).catch((error) => {

        });
        /* CPV IPTV */
        var CPV_and_IPTV_param =[
             {
                kpiName: 'CPV12',
                stateKey: 'CPV12_DATA',
                uploadType: '12MIS',
                type: null,
                codeType: 'CPV'
            },
            {
                kpiName: 'CPV24',
                stateKey: 'CPV24_DATA',
                uploadType: '24MIS',
                type: null,
                codeType: 'CPV'
            },
            {
                kpiName: 'IPTV12',
                stateKey: 'IPTV12_DATA',
                uploadType: '12MIS',
                type: null,
                codeType: 'IPTV'
            },
            {
                kpiName: 'IPTV24',
                stateKey: 'IPTV24_DATA',
                uploadType: '24MIS',
                type: null,
                codeType: 'IPTV'
            }
        ];

        /* 递归取目标值 */
        var getChartData2 = (index) => {
            POST('/monthReport/mGetMonthReport', {
                data: {
                    kpiName: CPV_and_IPTV_param[index].kpiName,
                    kpiYear: this.state.time,
                    uploadType: CPV_and_IPTV_param[index].uploadType,
                    type:  CPV_and_IPTV_param[index].type,
                    codeType: CPV_and_IPTV_param[index].codeType
                }
            }).then((res) => {
                if (res.success === true) {
                    var actualValue = JSON.parse(res.CPVAndIPTVResult).COUNT;
                    this.setState({
                        [CPV_and_IPTV_param[index].stateKey]: handleLineData(res.data, arrToArr(actualValue), true)
                    });
                }
                // 存在就继续
                if (CPV_and_IPTV_param[index + 1] !== undefined) {
                    getChartData2(++index);
                }
            }).catch((error) => {
                // 错了还得继续 && 存在就继续
                if (CPV_and_IPTV_param[index + 1] !== undefined) {
                    getChartData2(++index);
                }
            });
        }
        getChartData2(0);
    }
    render () {
        var state = this.state;
        return (
            <div>
                <Accordion defaultActiveKey="0" className="chart-list">
                    <Accordion.Panel header="PRTS(60%)">
                        <EchartLine
                            series={state.PRTS60_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="PRTS(95%)" className="chart-item">
                        <EchartLine
                            series={state.PRTS95_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="EIR" className="chart-item">
                        <EchartLine
                            series={state.EIR_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="Aftersales issue(60%)" className="chart-item">
                        <EchartLine
                            series={state.AftersalesIssue60_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="Aftersales issue(95%)" className="chart-item">
                        <EchartLine
                            series={state.AftersalesIssue95_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="Quality spill" className="chart-item">
                        <EchartLine
                            series={state.QualitySpill_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="IPTV(12 MIS)" className="chart-item">
                        <EchartLine
                            series={state.IPTV12_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="CPV(12 MIS)" className="chart-item">
                        <EchartLine
                            series={state.CPV12_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="IPTV(24 MIS)" className="chart-item">
                        <EchartLine
                            series={state.IPTV24_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="CPV(24 MIS)" className="chart-item">
                        <EchartLine
                            series={state.CPV24_DATA}
                        />
                    </Accordion.Panel>
                </Accordion>
            </div>
        )
    }
    
}

export default ResultIndex;


/**
 * 处理line chart 数据
 * @param {array} 包含目标值
 * @param {array} 实际值
 * @param {boolean} 是否截取到当前月
 * @return {array} series
 */
var handleLineData = function (resData0, resData1, isCutMount) {
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
    if (resData0[0] !== undefined) {
        var item = resData0[0];
        // 取公司目标值
        var targetValue = item.patacTargetValue;
        for (let i = 0; i < 12; i++) {
            LineSeries[0].data.push(targetValue)
        }
    }
    // 先把12个月填空
    for (let i = 0; i < 12; i++) {
        LineSeries[1].data.push('')
    }
    Array.isArray(resData1) && resData1.some(function (item, i) {
        // 跳出，截取到当前月份的数据
        if (isCutMount && i >= currMounth) {
            return true;
        }
        //把month可能只有一个
        LineSeries[1].data[item.MONTH - 1] = item.COUNT || 0;
        return false;
    });
    return LineSeries;
}

/**
 * 数据格式化 "[0,1,2,2]" -> [{MONTH: 1, COUNT:0}, {MONTH: 2, COUNT:1}, {MONTH: 3, COUNT:2}]
 * @param {Array} arr 
 */
var arrToArr = function (arr) {
    var res = [];
    arr.forEach(function (item, i) {
        res.push({
            MONTH: i + 1,
            COUNT: item
        });
    });
    return res;
}