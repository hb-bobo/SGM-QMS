import * as React from 'react';
import PropTypes from 'prop-types';
// import AppConfig from '@/AppConfig';
// import { RouteWithSubRoutes } from '@/router';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import HotIssue from './HotIssue/';
import intl from '@/components/intl';


/*项目质量验证总览 目前只有热点问题*/


class Verification extends React.Component {
    static contextTypes = {
        plugins: PropTypes.object,
        router: PropTypes.object
        // store: PropTypes.object
    }
    state = {
        title: '',
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
        tabValue: 0,
    }
    
    /*back*/
    goBack = () => {
        this.props.history.go(-1);
        if (this.props.match.path === '/project/verification') {
            this.setState({
                isIndex: true
            });
        }
    }
    
    render () {
        intl.setMsg(require('@/static/i18n').default);
        // var routes = [];
        // if (this.props.routes) {
        //     routes = this.props.routes;
        // }
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
                <div>
                    {/*列表*/
                        this.state.isIndex? 
                            <HotIssue parent={this}/>
                            : null
                    }
                </div>
                {/*route*/}
                {/*{routes.map((route, i) => {
                    return(
                        <RouteWithSubRoutes key={i} {...route}/>
                    )
                })}*/}
            </div>
        )
    }
}

export default Verification