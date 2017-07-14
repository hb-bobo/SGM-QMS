import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import HotIssueNotice from './hotIssueNotice';
import Warning from './warning';

import Scroller from '@/components/scroller';
import intl from '@/components/intl';


class Notice extends React.Component {
    state = {
        title: intl.get('QMS.notice'),
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
        tabValue: 0
    }
    tabChange = (value) => {
        this.setState({
            tabValue: value,
        });
    }
    /*调到操作页面*/
    goAdvance = (type) => {
        if (type) {
            this.props.history.push('/search/issue-advance/' + type);
            this.setState({
                isIndex: false
            });
        }
    }
    componentDidMount () {
        var hotIssueData = [{prblmNo:"222",state:"W",problemDesc:"222",reviewTime:"222",hotLevel:"222",stockDay:1,projectName:"222",problemSevertiy:1,crntPhase:"222",pspnsUser:"222"}]
        var warningData = [{prblmNo:"222",state:"R",problemDesc:"222",source:"222",projectName:"222",problemSevertiy:1,pspnsDept:"222",crntPhase:"asdasdasd",promotion:"222",stockDay:1,name:"222",reviewOp:"222"}]

        this.setState({
            title: intl.get('QMS.notice'),
            hotIssueData: hotIssueData,
            warningData: warningData
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
                        <IconButton onClick={() => {this.props.history.go(-1)}}>
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
                    <Tab label={intl.get('QMS.notice/hotIssueNotice')} value={0}>
                    </Tab>
                    <Tab label={intl.get('QMS.notice/warning')} value={1}>
                    </Tab>
                </Tabs>
                
                <SwipeableViews
                    index={this.state.tabValue}
                    onChangeIndex={this.tabChange}
                > 
                    <Scroller autoSetHeight={true}>
                        <HotIssueNotice dataSource={this.state.hotIssueData} tabValue={this.state.tabValue} goAdvance={this.goAdvance}/>
                    </Scroller>
                    <Scroller autoSetHeight={true}>
                        <Warning dataSource={this.state.warningData} tabValue={this.state.tabValue} goAdvance={this.goAdvance}/>
                    </Scroller>
                </SwipeableViews>
                
            </div>
        )
    }
}

export default Notice;