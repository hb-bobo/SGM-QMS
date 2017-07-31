import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import HotIssueNotice from './hotIssueNotice';
import Warning from './warning';

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
    goAdvance = (type, problemId) => {
        if (type) {
            this.props.history.push('/search/issue-advance/' + type + `?problemId=${problemId}`);
            this.setState({
                isIndex: false
            });
        }
    }
    componentDidMount () {
        this.setState({
            title: intl.get('QMS.notice')
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
                    <div>
                        <HotIssueNotice tabValue={this.state.tabValue} goAdvance={this.goAdvance}/>
                    </div>
                        
                    <div>
                        <Warning tabValue={this.state.tabValue} goAdvance={this.goAdvance}/>
                    </div>
                </SwipeableViews>
                
            </div>
        )
    }
}

export default Notice;