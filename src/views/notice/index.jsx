import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import HotIssueNotice from './hotIssueNotice';
import Warning from './warning';

import intl from '@/components/intl';
import CreateTabs from '@/components/create-tabs';
// import mixins from '@/decorator/mixins';
// import {goAdvance} from '@/mixins';


// 通知中心菜单配置
const menuData = [
    {
        tabTitle: intl.get('QMS.notice/hotIssueNotice'),
        tabContent: HotIssueNotice,
        path: 'notice/hotIssueNotice'
    },
    {
        tabTitle: intl.get('QMS.notice/warning'),
        tabContent: Warning,
        path: 'notice/warning'
    }
];

/**
 * 通知中心
 */
// @mixins()
class Notice extends React.Component {
    state = {
        title: intl.get('QMS.notice'),
    }
    tabChange = (value) => {
        this.setState({
            tabValue: value,
        });
    }
    
    componentDidMount () {
        this.setState({
            title: intl.get('QMS.notice')
        });
    }

    /*跳到推进页面*/
    goAdvance = (type, problemId) => {
        if (type) {
            this.props.history.push('/search/issue-advance/' + type + '?problemId='+problemId);
            this.setState({
                isIndex: false
            });
        }
    }
    render () {
        
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
                {/*tab and tabContent*/}
                <CreateTabs
                    menuData={menuData}
                    goAdvance={this.goAdvance}
                />
            </div>
        )
    }
}

export default Notice;