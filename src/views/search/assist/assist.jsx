import * as React from 'react';
import PropTypes from 'prop-types';
// import AppConfig from '@/AppConfig';
import { RouteWithSubRoutes } from '@/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import AssistDetails from './details';
import intl from '@/components/intl';
// import goBack from '@/mixin/goBack';
// import mixins from '@/mixins/mixins';

@connect(
    // mapStateToProps
    (state) => (state.common),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
        }, dispatch)
    })
)
// @mixins([goBack])
class Assist extends React.Component {
    state = {
        title: '',
        listData: [],
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
        tabValue: 0
    }
    static contextTypes = {
        muiTheme: PropTypes.object,
        plugins: PropTypes.object,
        store: PropTypes.object
    }
    componentDidMount ()　{
        var listData = [{sourcePrblmNo:"222",prblmDesc:"222",prjctName:"222",crntRspnsUser:"222",prblmSeverity:1,crntRspnsDept:"222",crntPhase:"222"}]

        this.setState({
            title: intl.get('QMS.project/overview'),
            listData: listData
        });
    }
    /*back*/
    goBack = () => {
        this.props.history.go(-1);
        if (this.props.match.path === '/search/assist') {
            this.setState({
                isIndex: true
            });
        }
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
                <div>
                    {/*列表*/
                        this.state.isIndex? 
                            <AssistDetails dataSource={this.state.listData}/>
                            : null
                    }
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

export default Assist