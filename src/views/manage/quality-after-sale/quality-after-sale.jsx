import * as React from 'react';
import './index.css';
// import { RouteWithSubRoutes } from '@/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import EchartGauge from '@/components/echarts/echart-gauge';
import EchartPie from '@/components/echarts/echart-pie';
import Scroller from '@/components/scroller';
import intl from '@/components/intl';
class QualityAfterSaleReport extends React.Component {
    state = {
        title: intl.get('QMS.aftermarket'),
        isIndex: true,
        chartData: {},
        date50Value: 0,
        date100Value: 0,
    }

    /*back*/
    goBack = () => {
        this.props.history.go(-1);
        if (this.props.match.path === '/manage/quality-after-sale') {
            this.setState({
                isIndex: true
            });
        }
    }
    componentDidMount () {
        this.setState({
            title: intl.get('QMS.aftermarket')
        });
        setTimeout(() => {
            console.log("test")
            this.setState({
                date50Value: 50,
                date100Value: 100,
            });
        }, 500);
    }
    render () {
        intl.setMsg(require('@/static/i18n').default)
        return (
            <div>
                {/*头部*/}
                <AppBar
                    title={this.state.title}
                    titleStyle={{textAlign: 'center'}}
                    iconElementLeft={
                        <IconButton onClick={this.goBack}>
                            <NavigationArrowBack color={'#FFF'}/>
                        </IconButton>
                    }
                    iconElementRight={
                        <span style={{display: 'inline-block', width: '2.6em'}}></span>
                    }   
                />
                <Scroller autoSetHeight={true}>
                    {/*顶部*/}
                    <div className="chat1">
                        <div className="chat1_piechat">
                            <EchartPie info={this.state.chartData} value={this.state.date50Value}></EchartPie>
                        </div>
                        <div className="chat1_instrumentchat1">
                            <EchartGauge info={this.state.chartData} value={this.state.date50Value}></EchartGauge>
                        </div>
                        <div className="chat1_instrumentchat2">
                            <EchartGauge info={this.state.chartData} value={this.state.date100Value}></EchartGauge>
                        </div>
                    </div>
                </Scroller>
            </div>
        )
    }
    
}

export default QualityAfterSaleReport;