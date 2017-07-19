import * as React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import PropTypes from 'prop-types';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
// 缩放(暂时只开发了缩放宽度的功能)
// import TouchZoom from '@/components/zoom';

class EchartPie extends React.Component {
    static defaultProps = {
        titleText: "0/0",
        titleSubText: "Spills",
        color: ["#e8807d","#dfdfdf"],
        height: "90px",
        width: "90px",
        info: [{}, {}]
    }
    static propTypes = {
        titleText: PropTypes.string,
        titleSubText: PropTypes.string,
        color: PropTypes.array,
        height: PropTypes.string,
        width: PropTypes.string,
        info: PropTypes.array
    }

    state = {
        option: JSON.parse(JSON.stringify(options)),
        chart: null
    }
    componentWillReceiveProps (nextProps) {
        var { titleSubText, color } = nextProps;
        // 传进来的值
        var chartData = nextProps.info;
        // 为了新的引用
        var options = Object.assign({}, this.state.option);
        
        options.title.subtext = titleSubText;
        options.title.text = (chartData[0].value || '') + '/' + (chartData[1].value || '');
        options.color = color;
        // 初始化data
        options.series[0].data = [];
        if (Array.isArray(chartData) && chartData.length) {
            var data = []
            chartData.forEach((item, index) => {
                data.push({
                    value: item.value,
                    name: ''
                });
            });
            options.series[0].data = data;
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