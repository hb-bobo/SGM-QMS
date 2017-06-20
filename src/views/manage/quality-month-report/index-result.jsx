import * as React from 'react';
import EchartLine from './echart-line';

class IndexResult extends React.Component {
    state = {
        PRTS60Data: {},
        EIRData: []
    }
    componentDidMount () {
        setTimeout(() => {
            this.setState({
                PRTS60Data: [{"mnthlyTargetId":"82","kpiYear":2017,"kpiName":"PRTS60","patacTargetValue":"60","deptTargetValue":"60"}],
                EIRData: [{"mnthlyTargetId":"84","kpiYear":2017,"kpiName":"EIR","patacTargetValue":"16","deptTargetValue":"16"}]
            });
        }, 3000)
    }
    render () {
        var chartData = [{"MONTH":5},{"COUNT":97,"MONTH":3},{"COUNT":95,"MONTH":2},{"COUNT":97,"MONTH":1}];
        return (
            <div>
                <EchartLine data={this.state.PRTS60Data} chartData={chartData}></EchartLine>
                <EchartLine data={this.state.EIRData} chartData={[]}></EchartLine>
            </div>
        )
    }
    
}


export default IndexResult;