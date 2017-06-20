import * as React from 'react';
import EchartLine from './echart-line';

class IndexProcess extends React.Component {
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


export default IndexProcess;