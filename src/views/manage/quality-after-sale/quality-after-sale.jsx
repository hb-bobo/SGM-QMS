import * as React from 'react';
import './index.css';
// import { RouteWithSubRoutes } from '@/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { Accordion } from 'antd-mobile';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import EchartGauge from '@/components/echarts/echart-gauge';
import EchartPie from '@/components/echarts/echart-pie';
import EchartLine from '@/components/echarts/echart-line';
import Scroller from '@/components/scroller';
import intl from '@/components/intl';

/*售后质量*/

class QualityAfterSaleReport extends React.Component {
    state = {
        title: intl.get('QMS.aftermarket'),
        isIndex: true,
        chartData: {},
        date50Value: 0,
        date100Value: 0,
        AREA_DATA: [],
        MY16_IPTV_INFO: [],
        MY16_IPTV_DATA: [],
        MY16_CPV_INFO: [],
        MY16_CPV_DATA: [],
        MY15_IPTV_INFO: [],
        MY15_IPTV_DATA: [],
        MY15_CPV_INFO: [],
        MY15_CPV_DATA: [],
        areaSeries: ["TOTALCOUNT","HOTCOUNT"],
        areaYFormat: "{value}",
        areaStyleColor: ["#2d3650","#e04a46"]
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
            this.setState({
                pieData: [{value: 40},{value: 120}],
                date50Value: 50,
                date100Value: 100,
                MY16_IPTV_INFO: [{"mnthlyTargetId":"82","kpiYear":2017,"kpiName":"PRTS60","patacTargetValue":"60","deptTargetValue":"60"}],
                MY16_IPTV_DATA: [{"MONTH":5},{"COUNT":97,"MONTH":3},{"COUNT":95,"MONTH":2},{"COUNT":97,"MONTH":1}],
                AREA_DATA: [{"TOTALCOUNT":3,"HOTCOUNT":2,"MONTH":1},
                            {"TOTALCOUNT":5,"HOTCOUNT":1,"MONTH":2},
                            {"TOTALCOUNT":7,"HOTCOUNT":0,"MONTH":3},
                            {"TOTALCOUNT":11,"HOTCOUNT":1,"MONTH":5},
                            {"TOTALCOUNT":12,"HOTCOUNT":1,"MONTH":6}]
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
                            <EchartPie info={this.state.pieData}></EchartPie>
                        </div>
                        <div className="chat1_instrumentchat1">
                            <EchartGauge info={this.state.chartData} value={this.state.date50Value}></EchartGauge>
                        </div>
                        <div className="chat1_instrumentchat2">
                            <EchartGauge info={this.state.chartData} value={this.state.date100Value}></EchartGauge>
                        </div>
                        <span className="left_instrument_span">在库时间&lt;50天问题比例</span>
					    <span className="right_instrument_span">在库时间&gt;100天问题比例</span>
                    </div>
                    
                    <div>
                        <EchartLine chartData={this.state.AREA_DATA}
                            info={[]}
                            series={this.state.areaSeries}
                            areaStyleColor={this.state.areaStyleColor}
                            yFormat={this.state.areaYFormat}
                            legend={false}
                        ></EchartLine>
                    </div>

                    <Accordion defaultActiveKey="0" className="chart-list">
                        <Accordion.Panel header="MY16 12MIS IPTV">
                            <EchartLine info={this.state.MY16_IPTV_INFO} chartData={this.state.MY16_IPTV_DATA}></EchartLine>
                        </Accordion.Panel>
                        <Accordion.Panel header="MY16 12MIS CPV">
                            <EchartLine info={this.state.MY16_CPV_INFO} chartData={this.state.MY16_CPV_DATA}></EchartLine>
                        </Accordion.Panel>
                        <Accordion.Panel header="MY15 12MIS IPTV">
                            <EchartLine info={this.state.MY15_IPTV_INFO} chartData={this.state.MY15_IPTV_DATA}></EchartLine>
                        </Accordion.Panel>
                        <Accordion.Panel header="MY15 12MIS CPV">
                            <EchartLine info={this.state.MY15_IPTV_INFO} chartData={this.state.MY15_CPV_DATA}></EchartLine>
                        </Accordion.Panel>
                    </Accordion>
                </Scroller>
            </div>
        )
    }
    
}

export default QualityAfterSaleReport;