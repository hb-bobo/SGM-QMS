import * as React from 'react';
import PropTypes from 'prop-types';
// import AppConfig from '@/AppConfig';
import { RouteWithSubRoutes } from '@/router';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import CreateTabs from '@/components/create-tabs';

import NewProjectQuality from './newProjectQuality';
import HotIssueReviewPlan from './hotIssueReviewPlan';

import intl from '@/components/intl';

// 设置本地语言包(公共语言包在App.jsx中提前设置了)
// import(/* webpackChunkName: intl */ './locale')
//     .then((intlMsg) => {
//         console.log(intlMsg)
//         intl.setMsg(intlMsg);
//     });
intl.setMsg(require('./locale'));

// 项目质量总览菜单配置
const menuData = [
    {
        tabTitle: intl.get('QMS.manage/overview'),
        tabContent: NewProjectQuality,
        path: 'manage/overview'
    },
    {
        tabTitle: intl.get('QMS.EQRProjectHotIssueReviewPlan'),
        tabContent: HotIssueReviewPlan,
        path: 'manage/overview'
    }
];
/* 项目质量总览 */
class Overview extends React.Component {
    static contextTypes = {
        muiTheme: PropTypes.object,
        plugins: PropTypes.object,
        store: PropTypes.object,
    }

    state = {
        title: '',
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
    }
    
    componentDidMount ()　{
        this.setState({
            title: intl.get('projectQuality'),
        });
    }
    
    /*back*/
    goBack = () => {
        this.props.history.go(-1);
    }
    /*跳到推进页面*/
    goAdvance = (type, problemId) => {
        if (type) {
            this.props.history.push('/search/issue-advance/' + type + '?problemId='+problemId);
        }
    }
    
    
    render () {
        
        var routes = [];
        if (this.props.routes) {
            routes = this.props.routes;
        }

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
                {/*tab and tabContent*/}
                <CreateTabs menuData={menuData} parent={this}/>

                {/*route*/}
                {routes.map((route, i) => {
                    return(
                        <RouteWithSubRoutes key={i} {...route}/>
                    )
                })}
            </div>
        )
    }
}

export default Overview