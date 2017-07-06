import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import HotReview from './hotIssueApprove';

import Scroller from '@/components/scroller';
import intl from '@/components/intl';


class Todo extends React.Component {
    state = {
        title: intl.get('QMS.todo'),
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
        tabValue: 0
    }
    tabChange = (value) => {
        this.setState({
            tabValue: value,
        });
    }
    /*调到推进页面*/
    goAdvance = (path) => {
        if (path) {
            this.props.history.push(path);
            this.setState({
                isIndex: false
            });
        }
    }
    componentDidMount () {
        this.setState({
            title: intl.get('QMS.todo')
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
                    <Tab label={intl.get('QMS.todo/hotIssueApprove')} value={0}>
                    </Tab>
                    <Tab label={intl.get('QMS.todo/warning')} value={1}>
                    </Tab>
                </Tabs>
                
                <SwipeableViews
                    index={this.state.tabValue}
                    onChangeIndex={this.tabChange}
                > 
                    <Scroller autoSetHeight={true}>
                        <HotReview goAdvance={this.goAdvance}/>
                    </Scroller>
                    <Scroller autoSetHeight={true}>
                       <div>2222222222222222222222</div>
                    </Scroller>
                </SwipeableViews>
                
            </div>
        )
    }
}

export default Todo;