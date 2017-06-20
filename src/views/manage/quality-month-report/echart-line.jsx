import * as React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import Zoom from '@/components/zoom';

class EchartLine extends React.Component {
    state = {
        option: options
    }
    componentDidMount () {
        var data = this.props.data[0];
        if (data) {
            for (let i = 0; i < 12; i++ ) {
                options.series[0].data.push(data.patacTargetValue)
            }
        } else {
            options.series[0].data = []
        }
        this.setState({
            option: options
        })
    }
    componentDidMount () {
        
    }
    onChartReadyCallback (chart) {
        chart.hideLoading();
    }
    clickHand () {
    }
    render () {
        return (
            <div>
                <Zoom>
                    <ReactEchartsCore
                        echarts={echarts}
                        option={this.state.option}
                        style={{height: "300px", width: "100%"}}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"}
                        onChartReady={this.onChartReadyCallback}
                        onEvents={{
                            'click': this.clickHand
                        }} 
                    />
                </Zoom>
            </div>
        )
    }
    
}

var options =  {
    tooltip : {
        trigger: 'axis'
    },
    grid: {
        top:20,
        left: 45,
        right: 0,
        bottom: 40
    },
    xAxis: [{
        type: 'category',
        data: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        axisLabel :{  
            interval:0   
        } 
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
        },
        splitLine:{
            show:false
        }
    }],
    series : [{
        name: "目标值",
        type: "line",
        data: []
    },{
        name: "实际值",
        type: "line",
        label: {
            normal: {
                show: true
            }
        },
        data: [1, 3]
    }],
    color: ["#c23531","#2f4554"]
};

export default EchartLine;