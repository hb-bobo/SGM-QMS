import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
    upTempData,
    clearTempData
} from '@/store/actions';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import {Tabs, Tab} from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';
import SwipeableViews from 'react-swipeable-views';

import HotReview from './hotIssueApprove';
import WarningReview from './warningApprove';

import intl from '@/components/intl';

@connect(
    // mapStateToProps
    (state) => ({tempData: state.common.tempData}),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            upTempData,
            clearTempData
        }, dispatch)
    })
)
class Todo extends React.Component {
    state = {
        title: intl.get('QMS.todo'),
        isIndex: true, // 除了主页显示itemList 其他页面都消失,
        tabValue: 0,
        hotIssueEditOpen: false,
        DrawerChildren: null // Drawer组件的子级
    }
    tabChange = (value) => {
        this.setState({
            tabValue: value,
        });
    }
    /*调到推进页面*/
    goAdvance = (path) => {
        if (path) {
            this.props.history.push(path);
            this.setState({
                isIndex: false
            });
        }
    }
    componentDidMount () {
        this.setState({
            title: intl.get('QMS.todo')
        });
    }
    /**
     * 设置Drawer的子级内容
     * @param {React.Children | Element} child 
     * @return {React.Children | Element}
     */
    setDrawerChildren (child) {
        this.setState({
            DrawerChildren: child
        });
    }
    render () {
        intl.setMsg(require('@/static/i18n').default)
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
                {/*tab*/}
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.tabChange}
                >
                    <Tab label={intl.get('QMS.todo/hotIssueApprove')} value={0}>
                    </Tab>
                    <Tab label={intl.get('QMS.todo/warning')} value={1}>
                    </Tab>
                </Tabs>
                
                <SwipeableViews
                    index={this.state.tabValue}
                    onChangeIndex={this.tabChange}
                > 
                    <div>
                        <HotReview ref="HotReview"  parent={this}/>
                    </div>
                    <div>
                        <WarningReview  goAdvance={this.goAdvance}/>
                    </div>
                        
                </SwipeableViews>
                {/*HotReview edit弹出,因为SwipeableViews 有transform 属性，导致子级的Position:fixed失效，所以放到SwipeableViews外层*/
                    <Drawer
                        ref="Drawer"
                        width="100%"
                        containerStyle={{top: '48px', overflow: 'hidden', display: this.state.tabValue === 0 ? 'block' : 'none' }} 
                        openSecondary={true}
                        open={this.state.hotIssueEditOpen}
                        children={this.state.DrawerChildren}
                    >
                    </Drawer>
                }
                
            </div>
        )
    }
}

export default Todo;