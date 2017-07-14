import * as React from 'react';
import PropTypes from 'prop-types';
// import AppConfig from '@/AppConfig';
// import { RouteWithSubRoutes } from '@/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import VerificationDetails from './details';
import intl from '@/components/intl';


/*项目质量验证总览*/

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
class Verification extends React.Component {
    state = {
        title: '',
        listData: [],
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
        tabValue: 0
    }
    static contextTypes = {
        plugins: PropTypes.object,
        // store: PropTypes.object
    }
    componentDidMount ()　{
        console.log(this)
        var listData = [{issueId:"222",status:"W",description:"222",severity:"222",step:"222",hotLevel:1,responsible:"222",department:"222",reviewTime:"222",reviewStatus:"222",instockDay:"222",projectName:"222"}]

        this.setState({
            title: intl.get('QMS.HotIssues'),
            listData: listData
        });
    }
    /* 评审级别查询刷新 */
    selectReLvl = (value) => {
        var listData = [{issueId:"111",status:"W",description:"111",severity:"111",step:"111",hotLevel:1,responsible:"111",department:"111",reviewTime:"111",reviewStatus:"111",instockDay:"111",projectName:"111"},
                        {issueId:"222",status:"W",description:"222",severity:"222",step:"222",hotLevel:1,responsible:"222",department:"222",reviewTime:"222",reviewStatus:"222",instockDay:"222",projectName:"222"}]
        this.setState({
            listData: listData,
            selectReviewLevel: value
        });
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
                            <VerificationDetails dataSource={this.state.listData} selectReLvl={this.selectReLvl}/>
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