import * as React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import PropTypes from 'prop-types';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
// 缩放(暂时只开发了缩放宽度的功能)
// import TouchZoom from '@/components/zoom';

class EchartLine extends React.Component {
    static defaultProps = {
        yFormat: "{value} %",
        legend: true,
        series: ["COUNT"]
    }
    static propTypes = {
        yFormat: PropTypes.string,
        legend: PropTypes.bool,
        series: PropTypes.array
    }

    state = {
        option: JSON.parse(JSON.stringify(options)),
        chart: null
    }
    componentWillReceiveProps (nextProps) {
        // 为了新的引用
        var options = Object.assign({}, this.state.option);
        options.yAxis[0].axisLabel.formatter = this.props.yFormat;
        options.xAxis[0].boundaryGap = false;
        options.legend.show = this.props.legend;

        var infoData = nextProps.info[0];
        var chartData = nextProps.chartData;
        // 目标值
        if (infoData && infoData.patacTargetValue) {
            for (let i = 0; i < 12; i++ ) {
                options.series[0].data.push(infoData.patacTargetValue)
            }
        } else {
            options.series[0].data = []
        }
        // 实际值
        if (Array.isArray(chartData) && chartData.length) {
            var areaStyleColor = this.props.areaStyleColor
            this.props.series.forEach(function (col,index) {
                //添加实际数据项目数
                if(index > 0){
                    options.series[index].name = "";
                    options.series.push(JSON.parse(JSON.stringify(options.series[index])))
                }
                //添加区域颜色效果
                if (areaStyleColor !== undefined && Array.isArray(areaStyleColor) && areaStyleColor.length) {
                    var color = areaStyleColor[index%areaStyleColor.length];
                    console.log(color)
                    options.series[index+1].itemStyle = {normal: {color: color, areaStyle: {borderColor: color, borderWidth: 0}}};
                    options.series[index+1].areaStyle = {normal: {color: color}};
                    options.series[index+1].showSymbol = false;
                }

                chartData.forEach(function (item) {
                    if (typeof item[col] === 'number') {
                        options.series[index+1].data[item.MONTH] = item[col];
                    }
                })
            })
        } else {
            options.series[1].data = [];
        }
        

        this.setState({
            option: Object.assign({}, options)
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
        return (
            <div>
                
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
            </div>
        )
    }
    
}

var options =  {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        show: true,
        data:['目标值','实际值'],
        right: 10
    },
    grid: {top:30, left: 45, right: 5, bottom: 40},
    xAxis: [{
        type: 'category',
        data: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        axisLabel :{  
            interval:0,
            textStyle: {
                fontStyle: 50
            }
        } 
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %',
            textStyle: {
                fontStyle: 50
            }
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
        data: []
    }],
    color: ["#c23531","#2f4554"]
};

export default EchartLine;