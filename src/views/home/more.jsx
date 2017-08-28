import * as React from 'react';
import { Link } from 'react-router-dom';
// ui
import { Toast } from 'antd-mobile';
// views
import MenuButton from './menu-button';
//components
import Scroller from '@/components/scroller';
import Access from '@/components/Access';

/**
 * 全部菜单
 * 后续加菜单，flex-col-1必须要有4个(目前是4个一排),没有就放空
 */
const MoreMenu = (props) => {
    // var showAll = props.showAll || false;
    return (
        <div className="home-menu">
            <Scroller
                autoSetHeight={true}
                bottomHeight={50}
                bounce={false}
            >
                <div>
                    <Access PATH="manage/overview">
                        <div className="menu-wrap">
                            <Link to="/manage/overview">
                                <MenuButton iconName="project" text="项目质量" bgName="leftBottom"/>
                            </Link>
                        </div>
                    </Access>
                    <Access PATH="manage/aftermarket">
                        <div className="menu-wrap">
                            <Link to="/manage/aftermarket">
                                <MenuButton iconName="after-sale" text="售后质量" bgName="leftBottom"/>
                            </Link>
                        </div>
                    </Access>
                    <Access PATH="manage/report">
                        <div className="menu-wrap">
                            <Link to="/manage/report">
                            <MenuButton iconName="monthly" text="质量月报" bgName="leftBottom"/>
                            </Link>
                        </div>
                    </Access>
                    <Access PATH="notice" model="includes">
                        <div className="menu-wrap">
                            <Link to="/notice">
                            <MenuButton iconName="notice2" text="通知中心" bgName="leftBottom"/>
                            </Link>
                        </div>
                    </Access>
                    <Access PATH="todo" model="includes">
                        <div className="menu-wrap">
                            <Link to="/todo">
                            <MenuButton iconName="msg" text="待办事项"/>
                            </Link>
                        </div>
                    </Access>
                    
                    <Access PATH="" model="includes">
                        <div className="menu-wrap">
                            <Link to="/" onClick={() => Toast.info('II期发布,敬请期待')}>
                            <MenuButton iconName="department" text="部门质量" />
                            </Link>
                        </div>
                    </Access>

                    <Access PATH="" model="includes">
                        <div className="menu-wrap">
                            <Link to="/" onClick={() => Toast.info('II期发布,敬请期待')}>
                            <MenuButton iconName="person" text="EQR评审" />
                            </Link>
                        </div>
                    </Access>
                    <Access PATH="" model="includes">
                        <div className="menu-wrap">
                            <Link to="/" onClick={() => Toast.info('II期发布,敬请期待')}>
                            <MenuButton iconName="person" text="EQR评审" />
                            </Link>
                        </div>
                    </Access>
                    <Access PATH="" model="includes">
                        <div className="menu-wrap">
                            <Link to="/" onClick={() => Toast.info('II期发布,敬请期待')}>
                            <MenuButton iconName="person" text="EQR评审" />
                            </Link>
                        </div>
                    </Access>
                    <Access PATH="" model="includes">
                        <div className="menu-wrap">
                            <Link to="/" onClick={() => Toast.info('II期发布,敬请期待')}>
                            <MenuButton iconName="person" text="EQR评审" />
                            </Link>
                        </div>
                    </Access>
                </div>    
            </Scroller>
        </div>
    )
}

export default MoreMenu;