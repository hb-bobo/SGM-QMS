import * as React from 'react';
import EchartLine from '@/components/echarts/echart-line';
import EchartLineAndBar from '@/components/echarts/echart-lineAndBar';

import { Accordion } from 'antd-mobile';
import { POST } from '@/plugins/fetch';
import SilkScroller from '@/components/silk-scroller';
import dateFormat from '@/utils/format/dateFormat';
import {handleLineData, handleLineBarData, arrToArr} from '../handleChartData';

/* 质量月报->过程指标 */
class ProcessIndex extends React.Component {
    state = {
        time: dateFormat(new Date(), 'yyyy-MM'),
        IQSK227_DATA: [],
        DV_by_XMRD_DATA: [],
        LL_DATA: [],
        DRBTR_Finish_Ratio_DATA: [],
        DRBFM_DATA: [],
        DFSS_Pass_Ratio_DATA: [],
        Delay_ICD_Status_DATA: []
    }
    componentDidMount () {
        var lineChartParams = [
            {
                kpiName: 'IQS',
                stateKey: 'IQSK227_DATA',
                uploadType: null,
            },
            {
                kpiName: 'MRD',
                stateKey: 'DV_by_XMRD_DATA',
                uploadType: null,
            },
            // {
            //     kpiName: '',
            //     stateKey: '',
            //     uploadType: null,
            // },
            {
                kpiName: 'DRBTR',
                stateKey: 'DRBTR_Finish_Ratio_DATA',
                uploadType: null,
            },
            {
                kpiName: 'DRBFM',
                stateKey: 'DRBFM_DATA',
                uploadType: null,
            },
            {
                kpiName: 'DFSS',
                stateKey: 'DFSS_Pass_Ratio_DATA',
                uploadType: null,
            },
            {
                kpiName: 'ICD',
                stateKey: 'Delay_ICD_Status_DATA',
                uploadType: null,
            }
        ]
        /* 递归取目标值（线图） */
        var getChartData = (index) => {
            POST('/monthReport/mGetMonthReportValue', {
                data: {
                    kpiName: lineChartParams[index].kpiName,
                    kpiYear: this.state.time,
                    uploadType: lineChartParams[index].uploadType,
                }
            }).then((res) => {
                if (res.success === true) {
                    var actualValue = JSON.parse(res.count).COUNT;
                    // TODO 需求需写死，部门还未统计，看需求再删除
                    if (dateFormat(new Date(), 'yyyy') <= 2017 && lineChartParams[index].kpiName === 'MRD') {
                        actualValue = [0, 100, 93].concat(actualValue);
                    }
                    this.setState({
                        [lineChartParams[index].stateKey]: handleLineData(res.data, arrToArr(actualValue))
                    });
                }
                // 存在就继续
                if (lineChartParams[index + 1] !== undefined) {
                    getChartData(++index);
                }
            }).catch((error) => {
                // 错了还得继续 && 存在就继续
                if (lineChartParams[index + 1] !== undefined) {
                    getChartData(++index);
                }
            });
        }
        getChartData(0);

        /* LL柱状图 */
        var LL_param = {
            kpiYear: this.state.time,
        }
        POST('/monthReport/mGetLessonReport', {
            data: LL_param
        }).then((res) => {
            if (res.success === true) {
                var actualValue = JSON.parse(res.data);
                // 应该开启
                var shouldOpenValue = arrToArr(actualValue.listN);
                // 实际开启
                var actualOpenValue = arrToArr(actualValue.listY);
                this.setState({
                    LL_DATA: handleLineBarData(null, shouldOpenValue, actualOpenValue)
                });
            }
        }).catch((error) => {
        });
        
    }
    /**
     * 重置容器高度
     */
    restScroller = () => {
        setTimeout(() => this.refs.scorller.refresh(), 400)
    }
    render () {
        var state = this.state;
        return (
            <SilkScroller
                preventDefault={false}
                useToTop={false}
                ref="scorller"
            >
                <Accordion defaultActiveKey="0" className="chart-list" onChange={this.restScroller}>
                    <Accordion.Panel header="IQS(K227)" className="chart-item">
                        <EchartLine
                            yFormat="{value}"
                            series={state.IQSK227_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="DV by X MRD" className="chart-item">
                        <EchartLine
                            series={state.DV_by_XMRD_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="LL" className="chart-item">
                        <EchartLineAndBar
                            yFormat="{value}"
                            series={state.LL_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="DRBTR Finish Ratio" className="chart-item">
                        <EchartLine
                            series={state.DRBTR_Finish_Ratio_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="DRBFM" className="chart-item">
                        <EchartLine
                            yFormat="{value}"
                            series={state.DRBFM_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="DFSS Pass Ratio" className="chart-item">
                        <EchartLine
                            series={state.DFSS_Pass_Ratio_DATA}
                        />
                    </Accordion.Panel>
                    <Accordion.Panel header="Delay ICD Status" className="chart-item">
                        <EchartLine
                            series={state.Delay_ICD_Status_DATA}
                        />
                    </Accordion.Panel>
                </Accordion>
            </SilkScroller>
        )
    }
    
}


export default ProcessIndex;