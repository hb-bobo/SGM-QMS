import * as React from 'react';
// import { RouteWithSubRoutes } from '@/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import ResultIndex from './result-index/result-index';
import ProcessIndex from './process-index/process-index';

import intl from '@/components/intl';

/* 质量月报 */
class QualityMonthReport extends React.Component {
    state = {
        title: intl.get('QMS.manage/report'),
        isIndex: true,
        tabValue: 0
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
    componentDidMount () {
        this.setState({
            title: intl.get('QMS.manage/report')
        });
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
                {/*tab*/}
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.tabChange}
                >
                    <Tab label={intl.get('QMS.ResultIndex')} value={0}>
                    </Tab>
                    <Tab label={intl.get('QMS.ProcessIndex')} value={1}>
                    </Tab>
                </Tabs>
                
                <SwipeableViews
                    index={this.state.tabValue}
                    onChangeIndex={this.tabChange}
                > 
                    <div>
                        <ResultIndex  parent={this}/>
                    </div>
                    <div>
                        <ProcessIndex  parent={this}/>
                    </div>
                        
                </SwipeableViews>
                {/*tab*/}
                {/* <Tabs
                    value={this.state.tabValue}
                    onChange={this.tabChange}
                >
                    <Tab label={intl.get('QMS.ResultIndex')} value={intl.get('QMS.ResultIndex')}>
                        <Scroller autoSetHeight={true} bounce={false}>
                            <ResultIndex/>
                        </Scroller>
                    </Tab>
                    <Tab label={intl.get('QMS.ProcessIndex')} value={intl.get('QMS.ProcessIndex')}>
                        <Scroller autoSetHeight={true} bounce={false}>
                            <ProcessIndex/>
                        </Scroller>
                    </Tab>
                </Tabs> */}
            </div>
        )
    }
    
}

export default QualityMonthReport;