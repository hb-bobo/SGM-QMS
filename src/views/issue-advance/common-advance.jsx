import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteWithSubRoutes } from '@/router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Circle from '@/components/circle';
// import { List, InputItem, WhiteSpace } from 'antd-mobile';
// import { createForm } from 'rc-form';

export class IssueAdvance extends React.Component {
  state = {
    title: '问题推进页',
  }
  render() {
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
                <IconButton onClick={() => {this.props.history.go(-1)}}>
                    <NavigationArrowBack color={'#FFF'}/>
                </IconButton>
            }
        />
        {/*route*/}
        {routes.map((route, i) => {
            return(
                <RouteWithSubRoutes key={i} {...route}/>
            )
        })}
        <div className="work-plan">
          <div className="work-paln-title">
            <span>工作计划</span>
          </div>
          <div className="flex-row">
            <div className="flex-col-8">
              <span>阶段</span>
            </div>
            <div className="flex-col-2">
              <button>新增</button>
            </div>
          </div>
          <div className="work-plan-list">
            <div className="item">
              <div className="flex-row">
                <div className="flex-col-9">
                  <span>
                    计划描述:
                  </span>
                  <span>
                    xxxx
                  </span>
                </div>
                <div className="flex-col-1">
                  <Circle value="G"/>
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col-1">
                  <div>
                    <span>责任人: </span>
                    <span>xx</span>
                  </div>
                  <div>
                    <span>计划完成时间: </span>
                    <span>xx</span>
                  </div>
                </div>
                <div className="flex-col-1">
                  <div>
                    <span>问题阶段: </span>
                    <span>xx</span>
                  </div>
                  <div>
                    <span>实际完成时间: </span>
                    <span>xx</span>
                  </div>
                </div>
              </div>
              <div className="flex-row">
                <div className="flex-col-1">
                  <Link to="/issue-advance/work-plan-eidt">编辑</Link>
                </div>
                <div className="flex-col-1">
                  <button>删除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default IssueAdvance
