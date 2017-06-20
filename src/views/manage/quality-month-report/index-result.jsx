import * as React from 'react';
import EchartLine from './echart-line';

class IndexResult extends React.Component {
    state = {
        PRTS60_INFO: [],
        EIR_INFO: [],
        PRTS60_DATA: []
    }
    componentDidMount () {
        setTimeout(() => {
            this.setState({
                PRTS60_INFO: [{"mnthlyTargetId":"82","kpiYear":2017,"kpiName":"PRTS60","patacTargetValue":"60","deptTargetValue":"60"}],
                EIR_INFO: [{"mnthlyTargetId":"84","kpiYear":2017,"kpiName":"EIR","patacTargetValue":"16","deptTargetValue":"16"}]
            });
        }, 6000);
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
                <EchartLine info={state.PRTS60_INFO} chartData={state.PRTS60_DATA}></EchartLine>
                <EchartLine info={state.EIR_INFO} chartData={[]}></EchartLine>
            </div>
        )
    }
    
}


export default IndexResult;