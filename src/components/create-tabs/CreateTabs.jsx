import * as React from 'react';
import PropTypes from 'prop-types';
import {Tabs} from 'antd-mobile';
import Access  from '@/components/Access';
import Label from '@/components/tabs/label';


const TabPane = Tabs.TabPane;

// 记录activeKey,当从当前页面点击调到推进页再返回时要定位到跳前的活动tab（第几个tab）
var oldTabValue = ''; 
/**
 * 创建tab 和tabContent menuData 需包当前菜单路径(path)
 * 
 */
export default class CreateTabs extends React.Component {
    static defaultProps= {
        menuData: [] // 当前页所有菜单{path:xx, components: xx, title: xx}
    }
    static propTypes = {
        menuData: PropTypes.array
    }
    state = {
        tabValue: '',
    }
    
    componentWillMount () {
        // 如果时首页(home.jsx调用了ClearOldtabValue 方法)， 会变为true，就不用记录
        if (this.$store.getState().common.isClearOldtabValue) {
            oldTabValue = '';
        }
    }

    componentDidMount () {
        this.tabChange(this.tabPanes[0].key);
    }
    componentWillUnmount () {
        oldTabValue = this.state.tabValue
    }
    tabChange = (value) => {
        this.setState({
            tabValue: value,
        });
    }
    /**
     * 生成tabs
     * @param {Array<Object>} menuData
     * @return {Array}
     */
    createTabs () {
        this.tabPanes = [];
        var getAccess = Access.getAccess;
        var menuData = this.props.menuData;
        
        for (let i = 0; i < menuData.length; i++) {
            var menu = menuData[i];
            if (getAccess(menu.path)) {
                this.tabPanes.push(
                    <TabPane tab={<Label value={menu.tabTitle}/>} key={menu.tabTitle}>
                        <menu.tabContent {...this.props}/>
                    </TabPane>
                )
            }
        }
        var defaultActiveKey = this.tabPanes[0].key;
        if (oldTabValue !== '') {
            defaultActiveKey = oldTabValue;
        }
        console.log(defaultActiveKey)
        return (
            <Tabs
                onChange={this.tabChange}
                defaultActiveKey={defaultActiveKey}
                pageSize={menuData.length}
                speed={10}
                swipeable={false}
            >       
                {this.tabPanes}           
            </Tabs>
        );
    }
    render () {
        return (
            <div>
                {this.createTabs()}
            </div>
        );
    }
}
