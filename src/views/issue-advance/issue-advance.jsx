import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteWithSubRoutes } from '@/router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Circle from '@/components/circle';
import Scroller from '@/components/scroller';

export class IssueAdvance extends React.Component {
  state = {
    title: '问题推进页',
    isIndex: true
  }
  componentWillUpdate (nextProps, nextState) {
    // 当从edit页面返回 此页面的时候设置index为true, 并纠正title
    if (this.state.isIndex === false && nextState.isIndex === false) {
      this.setState({
        title: '问题推进页',
        isIndex: true
      });
    }
    return true;
  }
  render() {
    var routes = [];
    if (this.props.routes) {
        routes = this.props.routes;
    }
    var advanceData = {
      id: 1111
    };
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
        <Scroller autoSetHeight={true}>
          {/*顶部*/}
          <div className={this.state.isIndex ? "advance-top flex-row" : "advance-top flex-row hide"}>
            <div className="flex-col-8">
              <span>{advanceData.id}</span>
            </div>
            <div className="flex-col-2">
              <button>热点</button>
              <button>问题</button>
            </div>
          </div>
          {/*route*/}
          {routes.map((route, i) => {
              route.parent = this;
              return(
                  <RouteWithSubRoutes key={i} {...route}/>
              )
          })}
          {/*工作计划*/}
          <div className={this.state.isIndex ? "work-plan" : "work-plan hide"}>
            <div className="work-paln-title">
              <span>工作计划</span>
            </div>
            <div className="flex-row">
              <div className="flex-col-8">
                <span>阶段</span>
              </div>
              <div className="flex-col-2">
                <Link to="/issue-advance/edit/add">
                  <button>新增</button>
                </Link>
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
                    <Link to="/issue-advance/edit/edit">编辑</Link>
                  </div>
                  <div className="flex-col-1">
                    <button>删除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scroller>
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default IssueAdvance
