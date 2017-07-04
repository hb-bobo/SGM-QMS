import * as React from 'react';
// import { RouteWithSubRoutes } from '@/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Tabs, Tab} from 'material-ui/Tabs';
import ResultIndex from './result-index/result-index';
import ProcessIndex from './process-index/process-index';
import Scroller from '@/components/scroller';
class QualityMonthReport extends React.Component {
    state = {
        title: '质量月报',
        isIndex: true,
        tabValue: '结果指标'
    }

    /*back*/
    goBack = () => {
        this.props.history.go(-1);
        if (this.props.match.path === '/manage/quality-month-report') {
            this.setState({
                isIndex: true
            });
        }
    }
    tabChange = (value) => {
        this.setState({
            tabValue: value,
        });
    }
    render () {
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
                {/*tab*/}
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.tabChange}
                >
                    <Tab label="结果指标" value="结果指标">
                        <Scroller autoSetHeight={true}>
                            <ResultIndex/>
                        </Scroller>
                    </Tab>
                    <Tab label="过程指标" value="过程指标">
                        <Scroller autoSetHeight={true}>
                            <ProcessIndex/>
                        </Scroller>
                    </Tab>
                </Tabs>
            </div>
        )
    }
    
}

export default QualityMonthReport;