import * as React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

import FullScreenZoom from '@/components/full-screen-zoom';

class IndexResult extends React.Component {
    state = {
        echartConfig: {},
        width: '200px'
    }
    componentDidMount () {
        this.setState({
            width: '600px'
        });
       
    }
    onChartReadyCallback (chart) {
        chart.hideLoading();
    }
    clickHand () {

    }

    render () {
        return (
            <div>
                <FullScreenZoom>
                    <ReactEchartsCore
                        echarts={echarts}
                        option={options}
                        style={{height: "300px", width: "100%"}}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"}
                        onChartReady={this.onChartReadyCallback}
                        onEvents={{
                            'click': this.clickHand
                        }} 
                    />
                </FullScreenZoom>
                <FullScreenZoom>
                    <ReactEchartsCore
                        echarts={echarts}
                        option={options}
                        style={{height: "300px", width: "100%"}}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"}
                        onChartReady={this.onChartReadyCallback}
                        onEvents={{
                            'click': this.clickHand
                        }} 
                    />
                </FullScreenZoom>
            </div>
        )
    }
    
}
var symbolSize = 20;
var data = [[15, 0], [-50, 10], [-56.5, 20], [-46.5, 30], [-22.1, 40]];

var options = {
    title: {
        text: 'Click to Add Points'
    },
    tooltip: {
        formatter: function (params) {
            var data = params.data || [0, 0];
            return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        min: -60,
        max: 20,
        type: 'value',
        axisLine: {onZero: false}
    },
    yAxis: {
        min: 0,
        max: 40,
        type: 'value',
        axisLine: {onZero: false}
    },
    series: [
        {
            id: 'a',
            type: 'line',
            smooth: true,
            symbolSize: symbolSize,
            data: data
        }
    ]
}

export default IndexResult;