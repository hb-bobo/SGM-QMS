import * as React from 'react';
import { RouteWithSubRoutes } from '@/router';
import AppConfig from '@/AppConfig';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import Scroller from '@/components/scroller';
import WorkPlan from './work-plan';

export class IssueAdvance extends React.Component {
  state = {
    title: '问题推进页',
    isIndex: true,
    data: {},
    workPlanData: []
  }
  componentDidMount () {
    fetch(AppConfig.API + '/getData', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "path": "workPlan.json"
          })
      }).then((res) => {
          return res.json()
      }).then((res) => {
          // this.props.actions.fillListData(res.EQRHotIssue.issueList)
          console.log(res)
          this.setState({
            workPlanData: res.result
          })
      })
  }
  componentWillUpdate (nextProps, nextState) {
    console.log(this.state.isIndex, nextState.isIndex)
    // 当从edit页面返回 此页面的时候设置index为true, 并纠正title
    if (this.state.isIndex === true && nextState.isIndex === true) {
      return false;
    }
    if (nextState.isIndex === true) {
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
      <div className="issue-advance">
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
              <span>问题编号: </span>
              <span>{advanceData.id}</span>
            </div>
            <div className="flex-col-3">
              <button>热点</button>
              <button>问题</button>
            </div>
          </div>
          {/*推进页不同的区域 route*/}
          {routes.map((route, i) => {
              route.parent = this;
              return(
                  <RouteWithSubRoutes key={i} {...route}/>
              )
          })}
          {/*工作计划*/}
          <div className={this.state.isIndex ? "work-plan" : "work-plan hide"}>
            <WorkPlan workPlanData={this.state.workPlanData}/>
          </div>
        </Scroller>
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default IssueAdvance
