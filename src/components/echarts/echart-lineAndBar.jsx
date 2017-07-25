import * as React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import PropTypes from 'prop-types';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
// 缩放(暂时只开发了缩放宽度的功能)
// import TouchZoom from '@/components/zoom';

export default class EchartLineAndBar extends React.Component {
    static defaultProps = {
        style: {
            height: "300px",
            width: "100%"
        },
        yFormat: "{value} %", // y轴上的格式
        legendData: ['落实率', '应该开启', '实际开启'],
        showLegend: true,
        color: ['#c23531', 'blue', 'green'], // line color
        series: [],
    }
    static propTypes = {
        style: PropTypes.object,
        yFormat: PropTypes.string,
        legendData: PropTypes.array,
        showLegend: PropTypes.bool,
        color: PropTypes.array,
        series: PropTypes.array,
    }
    static contextTypes = {
        language: PropTypes.string
    }
    state = {
        options: getOptions(),
        chart: null
    }
    componentWillMount() {
        // 为了新的引用
        var options = Object.assign({}, this.state.options);

        var {
            yFormat,
            legendData,
            showLegend,
            color,
        } = this.props;
        // set chart opts, 一般这里的值只用初始化设置一次
        options.yAxis[0].axisLabel.formatter = yFormat;
        options.legend.show = showLegend;
        options.legend.data = legendData;
        options.color = color;
        this.setState({
            options: options
        });
    }
    componentWillReceiveProps (nextProps) {
        // 为了新的引用
        // var options = JSON.parse(JSON.stringify(this.state.options));
        // var {
        //     series
        // } = this.props;
        
        // // 这是需从后台拿的值，取数据后一般就是改 series
        // options.series = series;
        // this.setState({
        //     options: options
        // });
    }
    shouldComponentUpdate (nextProps, nextState) {
        // series.length = 0 代表数据还没来，但父级render了，所以子不必render
        if (nextProps.series.length === 0) {
            return false;
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
        // 为了新的引用
        var options = Object.assign({}, this.state.options);
        var {
            series
        } = this.props;
        
        // 这是需从后台拿的值，取数据后一般就是改 series
        if (series.length !== 0) {
            options.series = series;
        }

        return (
            <div>
                <ReactEchartsCore
                    style={this.props.style}
                    echarts={echarts}
                    option={options}
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

// legend.data color series formatter默认值在此设置无效,到defaultProps设置
var getOptions = function () {
    return  {
        grid: {top:30, left: 45, right: 30, bottom: 40},
        tooltip: {
            trigger: 'axis',
            formatter: '{a1}:{c1}<br/>{a2}:{c2}<br/>{a0}:{c0}%'
        },
        legend: {
            show: true,
            data: [],
            right: 10
        },
        xAxis: [
            {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisLabel :{  
                    interval:0   
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value}'
                },
                splitLine:{
                    show:false
                }
            },
            {
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value} %'
                },
                splitLine:{
                    show:false
                }
            }
        ],
        series: [
        ],
        color: []
    };
}
