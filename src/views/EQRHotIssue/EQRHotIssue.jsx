import * as React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fillListData } from '@/store/actions';
// import store from '@/store';
import { RouteWithSubRoutes } from '@/router';
// import AppConfig from '@/AppConfig';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
// import Logged from '@/components/logged';
import ItemList from './item';
import data from 'static/data.json';

/*iconElementRight={
    <Logged 
        history={this.props.history}
        menuList={this.state.menuList}
    />
}*/
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
class EQRHotIssue extends React.Component {
    state = {
        title: 'ERQ热点评审',
        isIndex: true, // 除了主页显示itemList 其他页面都消失
        menuList: [
        ]
    }
    static contextTypes = {
        muiTheme: PropTypes.object,
        plugins: PropTypes.object
    }
    componentDidMount ()　{
       /* fetch(AppConfig.API + '/getData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "path": "data.json"
            })
        }).then((res) => {
            return res.json()
        }).then((res) => {
            this.props.actions.fillListData(res.EQRHotIssue.issueList)
            console.log(res)
        })*/
        this.props.actions.fillListData(data.EQRHotIssue.issueList)
    }
    /*back*/
    goBack = () => {
        this.props.history.go(-1);
        if (this.props.match.path === '/EQRHotIssue') {
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
                />
                {/*列表*/}
                {this.state.isIndex? <ItemList dataSource={this.props.listData} goAdvance={this.goAdvance}/>: null}
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

export default EQRHotIssue;
