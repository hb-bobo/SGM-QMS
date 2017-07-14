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

import intl from '@/components/intl';
// import { POST } from '@/plugins/fetch';
// import goBack from '@/mixin/goBack';
// import mixins from '@/mixins/mixins';

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
        
        var listData2 = [{prblmNo:"222",currentStatus:"G",prblmDesc:"222",projectName:"222",reviewLevel:"222",prblmSeverity:1,dept:"222",stockDay:1,crntPhase:"222"}]

        this.setState({
            title: intl.get('projectQuality'),
            listData2: listData2
        });
    }
    /* 评审计划查询刷新 */
    selectHis = (value) => {
        var listData = [{prblmNo:"1111",currentStatus:"G",prblmDesc:"1111",projectName:"11111",reviewLevel:"1111",prblmSeverity:1,dept:"1111",stockDay:1,crntPhase:"1111"},
                                {prblmNo:"222",currentStatus:"G",prblmDesc:"222",projectName:"222",reviewLevel:"222",prblmSeverity:1,dept:"222",stockDay:1,crntPhase:"222"}]
        console.log(value)
        this.setState({
            listData2: listData
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
    goAdvance = (type) => {
        if (type) {
            this.props.history.push('/search/issue-advance/' + type);
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
                    <Tab label={intl.get('QMS.manage/overview')} value={0}>
                    </Tab>
                    <Tab label={intl.get('QMS.EQRProjectHotIssueReviewPlan')} value={1}>
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
                                <HotIssueReviewPlan dataSource={this.state.listData2} selectHis={this.selectHis}/>
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