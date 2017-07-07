import * as React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import PropTypes from 'prop-types';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
// 缩放(暂时只开发了缩放宽度的功能)
// import TouchZoom from '@/components/zoom';

class EchartGauge extends React.Component {
    static defaultProps = {
        color: [
                    [0.2, '#E43F3D'],
                    [0.4, '#E98E2C'],
                    [0.6, '#DDBD4D'],
                    [0.8, '#7CBB55'],
                    [1, '#9CD6CE']
                ],
        value: 0,
        height: "200px",
        width: "200px",
        themeName: "",
        chartName: ""
    }
    static propTypes = {
        color: PropTypes.array,
        value: PropTypes.number,
        height: PropTypes.string,
        width: PropTypes.string,
        themeName: PropTypes.string,
        chartName: PropTypes.string
    }

    state = {
        option: JSON.parse(JSON.stringify(options)),
        chart: null
    }
    componentWillMount () {
        options.series[0].name = this.props.chartName;
        options.series[0].axisLine.lineStyle.color = this.props.color;
        this.setState({
            option: JSON.parse(JSON.stringify(options))
        });
    }
    componentDidMount () {
       
    }
    shouldComponentUpdate (nextProps, nextState) {
        // 实际值
        options.series[0].data = [{value: nextProps.value}]

        this.setState({
            option: options
        });

        if (this.state.chart !== null) {
            this.state.chart.hideLoading();
        }

        return true;
    }
    onChartReadyCallback = (chart) => {
        this.setState({
            chart: chart
        })
        chart.showLoading();
    }
    // 点击事件
    clickHand (e) {
        console.log(e)
    }
    render () {
        console.log(this.state.option)
        return (
            <div>
                <ReactEchartsCore
                    echarts={echarts}
                    option={this.state.option}
                    style={{height: this.props.height, width: this.props.width}}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={this.props.themeName}
                    onChartReady={this.onChartReadyCallback}
                    onEvents={{
                        'click': this.clickHand
                    }} 
                />
            </div>
        )
    }
    
}

var options =  {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: "",
            type: 'gauge',
            detail: {
                formatter:'{value}%',
                textStyle: {
                    fontSize: 20
                }
            },
            axisLine: {
                lineStyle: {
                    width: 4,
                    color: [
                        [1, '#000000']
                    ]
                }
            },
            axisTick: {
                show: true,
                splitNumber: 1
            },
            splitLine: {
                show: true,
                length: 0
            },
            axisLabel: {
                textStyle: {
                    fontSize: 1
                }
            },
            data: [{value: 0}]
        }
    ]
};

export default EchartGauge;