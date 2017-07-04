import * as React from 'react';
import EchartLine from '@/components/echarts/echart-line';

class ProcessIndex extends React.Component {
    state = {
        chartData: {}
    }

    render () {
        return (
            <div>
                <EchartLine info={this.state.chartData}></EchartLine>
                <EchartLine info={this.state.chartData}></EchartLine>
            </div>
        )
    }
    
}


export default ProcessIndex;