import * as React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import PropTypes from 'prop-types';
import 'echarts/lib/chart/gauge';
// 缩放(暂时只开发了缩放宽度的功能)
// import TouchZoom from '@/components/zoom';

class EchartGauge extends React.Component {
    static defaultProps = {
        color: [[0.2,"#d2eee4"], [0.8,"#5bd0f9"], [1,"#60ed92"]],
        value: 0,
        height: "130px",
        width: "130px",
        themeName: "",
        chartName: "结构成本节省率"
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
    componentWillReceiveProps (nextProps) {
        // 为了新的引用
        var options = Object.assign({}, this.state.option);
        options.series[0].name = this.props.chartName;
        options.series[0].axisLine.lineStyle.color = this.props.color;
        // 实际值
        options.series[0].data = [{value: nextProps.value}]
        if (this.state.chart !== null) {
            this.state.chart.hideLoading();
        }
        this.setState({
            option: Object.assign({}, options)
        });
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
        show: false
    },
    series: [
        {
            name: "",
            type: 'gauge',
            radius: "100%",
            startAngle: 220,
            endAngle: -40,
            min: 0,
            max: 100,
            axisLine: {
                lineStyle: {width: 6, color: []}
            },
            axisLabel: {distance: -18,textStyle: {fontSize:8,fontFamily:"Arial"}},
            axisTick: {splitNumber: 1,},
            splitLine: {show: false},
            detail: {
                formatter:'{value}%',
                textStyle: {fontSize: 18, fontWeight: "normal", fontFamily:"Arial"}
            },
            pointer: {
                width:4
            }
        }
    ]
};

export default EchartGauge;