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

import Drawer from 'material-ui/Drawer';

import hotIssueApprove from './hotIssueApprove';
import WarningReview from './warningApprove';

import intl from '@/components/intl';
import CreateTabs from '@/components/create-tabs';


// 代办菜单配置
const menuData = [
    {
        tabTitle: intl.get('QMS.todo/hotIssueApprove'),
        tabContent: hotIssueApprove,
        path: 'todo/hotIssueApprove'
    },
    {
        tabTitle: intl.get('QMS.todo/warning'),
        tabContent: WarningReview,
        path: 'todo/warning'
    }
];


/**
 * 代办
 */
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
        hotIssueEditOpen: false,
        DrawerChildren: null // Drawer组件的子级
    }
    tabChange = (value) => {
        this.setState({
            tabValue: value,
        });
    }
    /*调到推进页面*/
    goAdvance = (advanceType, problemId) => {
        this.props.history.push('/search/issue-advance/' + advanceType + `?problemId=${problemId}`);
        this.setState({
            isIndex: false
        });
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
                {/*tab and tabContent*/}
                <CreateTabs
                    ref={ref => this.tabs = ref}
                    menuData={menuData}
                    parent={this}
                />

                {/*hotIssueApprove edit弹出,因为ant 的 tabs滑动功能 有transform 属性，导致子级的Position:fixed失效，所以放到CreateTabs外层*/
                    <Drawer
                        ref="Drawer"
                        width="100%"
                        containerStyle={{
                            top: '48px',
                            overflow: 'hidden',
                            display: (this.tabs && this.tabs.state.tabValue === intl.get('QMS.todo/hotIssueApprove')) ? 'block' : 'none',
                            padding: '10px'
                        }}
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