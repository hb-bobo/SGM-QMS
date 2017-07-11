import * as React from 'react';
import { Link } from 'react-router-dom';
import MenuButton from './menu-button';
import Scroller from '@/components/scroller';

/**
 * 全部菜单
 * 后续加菜单，flex-col-1必须要有4个(目前是4个一排),没有就放空
 */
const MoreMenu = (props) => {

    return (
        <div className="home-menu">
            <Scroller autoSetHeight={true}>
                <div className="flex-row">
                    <div className="flex-col-1">
                        <Link to="/manage/overview">
                            <MenuButton iconName="project" text="项目质量"/>
                        </Link>
                    </div>
                    <div className="flex-col-1">
                        <Link to="/manage/quality-after-sale">
                            <MenuButton iconName="after-sale" text="售后质量"/>
                        </Link>
                    </div>
                    <div className="flex-col-1">
                        <Link to="/manage/report">
                            <MenuButton iconName="monthly" text="质量月报"/>
                        </Link>
                    </div>
                    <div className="flex-col-1">
                        <Link to="/">
                            <MenuButton iconName="notice" text="待定"/>
                        </Link>
                    </div>
                </div>
                <div className="flex-row">
                    <div className="flex-col-1">
                        <Link to="/todo">
                            <MenuButton iconName="msg" text="待办事项"/>
                        </Link>
                        
                    </div>
                    <div className="flex-col-1">
                        <Link to="/">
                            <MenuButton iconName="department" text="待定"/>
                        </Link>
                    </div>
                    <div className="flex-col-1">
                        <Link to="/">
                        <MenuButton iconName="person" text="待定"/>
                        </Link>
                    </div>
                    <div className="flex-col-1">
                        <Link to="/project/verification">
                            <MenuButton iconName="project" text="热点问题"/>
                        </Link>
                        
                    </div>
                </div>
                <div className="flex-row">
                    <div className="flex-col-1">
                        <Link to="/project/overview">
                            <MenuButton iconName="project" text="项目质量总览"/>
                        </Link>
                    </div>
                    <div className="flex-col-1">
                         
                    </div>
                    <div className="flex-col-1">
  
                    </div>
                    <div className="flex-col-1">
                        <Link to="/test">
                            <MenuButton iconName="person" text="test"/>
                        </Link> 
                    </div>
                </div>
                
            </Scroller>
        </div>
    )
}

export default MoreMenu;