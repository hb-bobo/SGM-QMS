import * as React from 'react';
import PropTypes from 'prop-types';
// import AppConfig from '@/AppConfig';
import { RouteWithSubRoutes } from '@/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fillListData } from '@/store/actions';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Tabs, Tab} from 'material-ui/Tabs';
import NewProjectOverviewItemList from './new-project-overview-item';
import getProjectQualityList from 'static/getProjectQualityList.json';
// import goBack from '@/mixin/goBack';
// import mixins from '@/mixin/mixin';

@connect(
    // mapStateToProps
    (state) => (state.common),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            fillListData
        }, dispatch)
    })
)
// @mixina([goBack])
class ProjectQuality extends React.Component {
    state = {
        title: '项目质量',
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
        tabValue: '新项目质量总览'
    }
    static contextTypes = {
        muiTheme: PropTypes.object,
        plugins: PropTypes.object,
        store: PropTypes.object
    }
    componentDidMount ()　{
        /*fetch(AppConfig.API + '/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "path": "getProjectQualityList.json"
            })
        }).then((res) => {
            return res.json()
        }).then((res) => {
            this.props.actions.fillListData(res.result)
            console.log(res.result)
        })*/
        this.props.actions.fillListData(getProjectQualityList.result)
        
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
    /*调到操作页面*/
    goAdvance = (path) => {
        if (path) {
            this.props.history.push(path);
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
                    <Tab label="新项目质量总览" value="新项目质量总览">
                        {/*列表*/
                            this.state.isIndex? 
                                <NewProjectOverviewItemList dataSource={this.props.listData} GoAdvance={this.goAdvance}/>
                                : null
                        }
                    </Tab>
                    <Tab label="质量评审技术" value="质量评审技术">
                        <div>
                            <p>
                            This is another example of a controllable tab. Remember, if you
                            use controllable Tabs, you need to give all of your tabs values or else
                            you wont be able to select them.
                            </p>
                        </div>
                    </Tab>
                </Tabs>
                
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

export default ProjectQuality