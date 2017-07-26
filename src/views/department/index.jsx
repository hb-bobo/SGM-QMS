
import * as React from 'react';
import PropTypes from 'prop-types';
// import AppConfig from '@/AppConfig';
import { RouteWithSubRoutes } from '@/router';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
// import intl from '@/components/intl';

/* 部门质量 */

export default class Department extends React.Component {
    
    static contextTypes = {
        plugins: PropTypes.object,
        store: PropTypes.object
    }
    state = {
        title: '部门质量',
        listData: [],
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
        tabValue: 0
    }
    componentDidMount ()　{
    }
    /*back*/
    goBack = () => {
        this.props.history.go(-1);
        if (this.props.match.path === '/department') {
            this.setState({
                isIndex: true
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
                    iconElementRight={
                        <span style={{display: 'inline-block', width: '2.6em'}}></span>
                    }   
                />
                <div className="text-center">
                    未开通
                </div>
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
