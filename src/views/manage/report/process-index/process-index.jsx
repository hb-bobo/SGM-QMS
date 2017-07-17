import * as React from 'react';
import EchartLine from '@/components/echarts/echart-line';
import { Accordion } from 'antd-mobile';
class ProcessIndex extends React.Component {
    state = {
        chartData: {}
    }
    componentDidMount () {
        setTimeout(() => {
            this.setState({
                PRTS60_INFO: [{"mnthlyTargetId":"82","kpiYear":2017,"kpiName":"PRTS60","patacTargetValue":"60","deptTargetValue":"60"}],
                EIR_INFO: [{"mnthlyTargetId":"84","kpiYear":2017,"kpiName":"EIR","patacTargetValue":"16","deptTargetValue":"16"}]
            });
        }, 2000);
        setTimeout(() => {
            this.setState({
                PRTS60_DATA: [{"MONTH":5},{"COUNT":97,"MONTH":3},{"COUNT":95,"MONTH":2},{"COUNT":97,"MONTH":1}]
            });
        });
    }
    render () {
        var state = this.state;
        return (
            <div>
                <Accordion defaultActiveKey="0" className="chart-list">
                    <Accordion.Panel header="PRTS(60%)">
                        <EchartLine info={state.PRTS60_INFO} chartData={state.PRTS60_DATA}></EchartLine>
                    </Accordion.Panel>
                    <Accordion.Panel header="PRTS(60%)" className="chart-item">
                        <EchartLine info={state.EIR_INFO} chartData={[]}></EchartLine>
                    </Accordion.Panel>
                    <Accordion.Panel header="PRTS(60%)" className="chart-item">
                        Text text text text text text text text text text text text text text text
                    </Accordion.Panel>
                </Accordion>
            </div>
        )
    }
    
}


export default ProcessIndex;