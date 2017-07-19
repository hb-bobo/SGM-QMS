import * as React from 'react';
import PropTypes from 'prop-types';
// import AppConfig from '@/AppConfig';
import { RouteWithSubRoutes } from '@/router';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fillListData } from '@/store/actions';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import NewProjectQuality from './newProjectQuality';
import HotIssueReviewPlan from './hotIssueReviewPlan';

import Label from '@/components/tabs/label';
import intl from '@/components/intl';
// import { POST } from '@/plugins/fetch';
// import goBack from '@/mixin/goBack';
// import mixins from '@/mixins/mixins';

/* 项目质量总览 */
// @connect(
//     // mapStateToProps
//     (state) => (state.common),
//     // buildActionDispatcher
//     (dispatch, ownProps) => ({
//         actions: bindActionCreators({
//             fillListData
//         }, dispatch)
//     })
// )
// @mixins([goBack])
class Overview extends React.Component {
    state = {
        title: '',
        listData2: [],
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
        tabValue: 0
    }
    static contextTypes = {
        muiTheme: PropTypes.object,
        plugins: PropTypes.object,
        store: PropTypes.object
    }
    componentDidMount ()　{
        // AppConfig.API + '/getData'
        /*fetch('http://10.6.96.211:8090/QMS/backlog/testA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'id=' + JSON.stringify({
                "id": "getProjectQualityList.json",
                "ids": '22'
            }),
        }).then((res) => {
            console.log(res)
            return res.json()
        }).then((res) => {
            // this.props.actions.fillListData(res.result)
            console.log(res)
        })*/
        
        this.setState({
            title: intl.get('projectQuality'),
        });
    }
    
    /*back*/
    goBack = () => {
        this.props.history.go(-1);
        if (this.props.match.path === '/manage/project-quality') {
            this.setState({
                isIndex: true
            });
        }
    }
    /*跳到推进页面*/
    goAdvance = (type, id) => {
        if (type) {
            this.props.history.push('/search/issue-advance/' + type + '?id');
            this.setState({
                isIndex: false
            });
        }
    }
    tabChange = (value) => {
        this.setState({
            tabValue: value,
        });
    }
    render () {
        intl.setMsg(require('@/static/i18n').default);
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
                {/*tab*/}
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.tabChange}
                >
                    <Tab label={<Label value={intl.get('QMS.manage/overview')}/>} value={0}>
                    </Tab>
                    <Tab label={<Label value={intl.get('QMS.EQRProjectHotIssueReviewPlan')}/>} value={1}>
                    </Tab>
                </Tabs>
                <SwipeableViews
                    index={this.state.tabValue}
                    onChangeIndex={this.tabChange}
                >
                    <div>
                        {/*列表*/
                            this.state.isIndex? 
                                <NewProjectQuality/>
                                : null
                        }
                    </div>
                    <div>
                        {/*列表*/
                            this.state.isIndex? 
                                <HotIssueReviewPlan/>
                                : null
                        }
                    </div>
                </SwipeableViews>
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