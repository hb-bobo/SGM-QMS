import * as React from 'react';
import EchartLine from '@/components/echarts/echart-line';
import { Accordion } from 'antd-mobile';
import { POST } from '@/plugins/fetch';
import dateFormat from '@/utils/format/dateFormat';

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
        var params = [
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
                kpiName: 'EIR',
                stateKey: 'EIR_DATA',
                uploadType: 'EIR',
                type: 'EIR',
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
            {
                kpiName: 'SPILL',
                stateKey: 'QualitySpill_DATA',
                uploadType: null,
                type: null,
                codeType: null
            },
            {
                kpiName: 'CPV12',
                stateKey: 'IPTV12_DATA',
                uploadType: '12MIS',
                type: null,
                codeType: 'CPV'
            },
            {
                kpiName: 'CPV24',
                stateKey: 'IPTV24_DATA',
                uploadType: '24MIS',
                type: null,
                codeType: 'CPV'
            },
            {
                kpiName: 'IPTV12',
                stateKey: 'CPV12_DATA',
                uploadType: '12MIS',
                type: null,
                codeType: 'IPTV'
            },
            {
                kpiName: 'IPTV24',
                stateKey: 'CPV24_DATA',
                uploadType: '24MIS',
                type: null,
                codeType: 'IPTV'
            }
        ];
        
        /* 递归取目标值 */
        var getChartData = (index) => {
            POST('/monthReport/mGetMonthReport', {
                data: {
                    kpiName: params[index].kpiName,
                    kpiYear: this.state.time,
                    uploadType: params[index].uploadType,
                    type:  params[index].type,
                    codeType: params[index].codeType
                }
            }).then((res) => {
                if (res.success === true) {
                    var actualValue = null;
                    if (params[index].kpiName === 'EIR') {
                        actualValue = res.resultPrtsAndAi;
                    }
                    actualValue = res.resultPrtsAndAi;
                    this.setState({
                        [params[index].stateKey]: handleLineData(res.data, actualValue, params[index].kpiName)
                    });
                }
                // 存在就继续
                if (params[index + 1] !== undefined) {
                    getChartData(++index);
                }
            }).catch((error) => {
                // 错了还得继续 && 存在就继续
                if (params[index + 1] !== undefined) {
                    getChartData(++index);
                }
            });
        }
        getChartData(0);
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
 * @param {string} kpiName
 * @return {array} series
 */
var handleLineData = function (resData0, resData1, kpiName) {
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
    /* if (kpiName === '') {

    } */
    // 后台返回的数据有的是[{MONTH: 1, COUNT: 1}]有的只时count: [number...],这就比较坑了
    Array.isArray(resData1) && resData1.forEach(function (item, i) {
        //把month可能只有一个
        LineSeries[1].data[item.MONTH - 1] = item.COUNT || 0
    });
    return LineSeries;
}