import * as React from 'react';
// import { RouteWithSubRoutes } from '@/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Tabs, Tab} from 'material-ui/Tabs';
import IndexResult from './index-result';
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
                        <IndexResult></IndexResult>
                    </Tab>
                    <Tab label="过程指标" value="过程指标">
                        <div>
                            <p>
                            过程指标
                            </p>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
    
}

export default QualityMonthReport;