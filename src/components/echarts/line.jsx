import * as React from 'react';

var chart = null;
var style = {
    width: '300px',
    height: '300px'
}
class ReactEcharts extends React.Component {
    state = {
        style: style
    }
    componentDidMount () {
        var { echarts } = this.props;
        console.log(this.refs.chart)
        chart =  echarts.init(this.refs.chart);
        chart.setOption(this.props.option)
        this.setState({
            style: {
                width: '600px',
                height: '300px'
            }
        })
        setTimeout(function () {
            chart.resize();
        }, 1000)
    }
    render () {
        return (
            <div ref="chart" style={this.state.style}></div>
        )
    }
}
export default ReactEcharts
