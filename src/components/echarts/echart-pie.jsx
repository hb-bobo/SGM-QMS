import * as React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import PropTypes from 'prop-types';
import 'echarts/lib/chart/pie';
// 缩放(暂时只开发了缩放宽度的功能)
// import TouchZoom from '@/components/zoom';

class EchartPie extends React.Component {
    static defaultProps = {
        titleText: "1/4",
        titleSubText: "Spills",
        color: ["#e8807d","#dfdfdf"],
        data:[
            {
                value:40,
                itemStyle:{
                    normal:{
                        color:'#e8807d'
                    }
                }
            },
            {
                value:120,
                itemStyle:{
                    normal:{
                        color:'#dfdfdf'
                    }
                }
            }
        ],
        height: "90px",
        width: "90px"
    }
    static propTypes = {
        data: PropTypes.array,
        titleText: PropTypes.string,
        titleSubText: PropTypes.string,
        height: PropTypes.string,
        width: PropTypes.string
    }

    state = {
        option: JSON.parse(JSON.stringify(options)),
        chart: null
    }
    componentWillMount () {
        options.title.text = this.props.titleText;
        options.title.subtext = this.props.titleSubText;
        this.setState({
            option: JSON.parse(JSON.stringify(options))
        });
    }
    componentDidMount () {
       
    }
    shouldComponentUpdate (nextProps, nextState) {
        // 实际值
        var chartData = nextProps.chartData;
        if (Array.isArray(chartData) && chartData.length) {
            chartData.forEach( (item,index) => {
                var color = this.props.color[index];
                if (item.color !== undefined) {
                    color = item.color
                }
                options.series[0].data.push({value: item.value, itemStyle: {normal: {color: color}}});
            })
        }

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
    title: {
		text: "",
		subtext: "",
		subtextStyle: {
			fontSize: 14,
			color: "#333333"
		},
		left: "center",
		top: 30,
		padding: 0
	},
	series: [{
		name:'',
        type:'pie',
        radius: ['85%', '100%'],
        labelLine: {
            normal: {
                show: false
            }
        },
        data:[]
	}]
};

export default EchartPie;