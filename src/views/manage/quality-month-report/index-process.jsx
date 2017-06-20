import * as React from 'react';
import EchartLine from './echart-line';

class IndexProcess extends React.Component {
    state = {
        chartData: {}
    }

    render () {
        return (
            <div>
                <EchartLine data={this.state.chartData}></EchartLine>
                <EchartLine data={this.state.chartData}></EchartLine>
            </div>
        )
    }
    
}


export default IndexProcess;