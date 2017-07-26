import * as React from 'react';
import { RouteWithSubRoutes } from '@/router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upWorkPlanListData } from '@/store/actions';
import './index.css';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Drawer from 'material-ui/Drawer';
// import { WingBlank, Button, Icon } from 'antd-mobile';
import Scroller from '@/components/scroller';
import WorkPlan from './work-plan';
import { POST } from '@/plugins/fetch';
import IconUp from '@/components/icon/up';
import SpaceRow from '@/components/space-row';
import HotUp from './hot-up';
import IssueUP from './issue-up';
import intl from '@/components/intl';
import querystring from '@/utils/tools/querystring';

@connect(
    // mapStateToProps
    (state) => ({workPlanData: state.issueAdvance.workPlanData}),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            upWorkPlanListData
        }, dispatch)
    })
)
export class IssueAdvance extends React.Component {

  state = {
    title: intl.get('QMS.' + this.props.advType + 'Report'),
    isIndex: true,
    hotUpOpen: false,
    issueUPOpen: false,
    issueData: {},
    pc: {}
  }

  componentWillMount () {
    var advType =  /\w+$/.exec(this.props.location.pathname)[0];
    this.setState({
      advType: advType
    });
  }

  componentDidMount () {
    var id = querystring.parse(this.props.location.search).id;
    var url = '/mproblem/';
    var params = {
      "PRTS": 'mPrtsDetail',
      "EIR": 'mEirDetail',
      "QDCPIR": 'mQdcDetail',
      "Readacross": 'mReadDetail',
      "SIL": 'mSilDetail',
      "VE": 'mVeDetail',
      "VOC": 'mVocDetail',
    }
    url += params[this.state.advType];
    
    POST(url, {
      data: {
        id: id
      }
    }).then((res) => {
        if (res.success === true) {
          var pc = {};
          if(res.pc && res.pc.length > 0){
            pc = res.pc[0];
          }
          this.setState({
            issueData : res.data,
            pc : pc
          });
          this.props.actions.upWorkPlanListData({
            action: 'update',
            value: res.workplan
          });
        }
    })
    this.setState({
      title: intl.get('QMS.' + this.state.advType + 'Report')
    });
  }
  componentWillUpdate (nextProps, nextState) {
    // 当从edit页面返回 此页面的时候设置index为true, 并纠正title
    if (nextState.isIndex === true && this.state.isIndex !== true) {
      this.setState({
        title: intl.get('QMS.' + this.state.advType + 'Report'),
        isIndex: true,
      });
    }
    return true;
  }

  goHotUp = () => {
    POST('/mproblem/getMaxReviewLog', {
      data: {
        id: this.state.issueData.prblmId
      }
    }).then((res) => {
      if (res.success === true) {
        if(res.result === 'C'){
          alert("已存在未审核的申请");
        }else{
          intl.setMsg(require('@/static/i18n').default, require('./locale'));
          this.setState({
            hotUpOpen: true,
            title: intl.get('HotEscalate'),
            isIndex: false
          });
          return false
        }
      }
    })
  }

  goIssueUp = () => {
    POST('/mproblem/getMaxUpgradeLog', {
      data: {
        id: this.state.issueData.prblmId
      }
    }).then((res) => {
      if (res.success === true) {
        if(res.result === 'C'){
          alert("已存在未审核的申请");
        }else{
          intl.setMsg(require('@/static/i18n').default, require('./locale'));
          this.setState({
            issueUPOpen: true,
            title: intl.get('IssueEscalate'),
            isIndex: false
          });
          return false
        }
      }
    })
  }

  render() {
    intl.setMsg(require('@/static/i18n').default, require('./locale'));
    var routes = [];
    if (this.props.routes) {
        routes = this.props.routes;
    }
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
        <Scroller autoSetHeight={true} bounce={false}>
          {/*顶部*/}
          <div className={this.state.isIndex ? "advance-top flex-row" : "advance-top flex-row hide"}>
            <div className="flex-col-6">
              <span>{intl.get('QMS.IssueNo')}: </span>
              <span style={{marginLeft: '1.4em', color: '#6AC4F6'}}>{this.state.issueData.sourcePrblmNo}</span>
            </div>
            <SpaceRow height={50} width="1px" backgroundColor="#EEEDED"/>
            <div className="flex-col-4">
              <span onClick={this.goHotUp} style={{display: this.state.advType === 'VOC' ? "none" : "inline-block"}}>
                <IconUp value="热点" style={{marginLeft: '10px'}} > </IconUp>
              </span>
              <span onClick={this.goIssueUp}>
                <IconUp value="问题" style={{marginLeft: '10px'}}> </IconUp>
              </span>
            </div>
          </div>

          {/*热点上升弹出*/}
          <Drawer 
              width="100%" 
              containerStyle={{top: '48px'}} 
              openSecondary={true}
              parent={this}
              open={this.state.hotUpOpen} 
          >
              <HotUp data={{}} parent={this}/>
          </Drawer>
          
          {/*问题上升弹出*/}
          <Drawer 
              width="100%" 
              containerStyle={{top: '48px'}} 
              openSecondary={true}
              parent={this}
              open={this.state.issueUPOpen} 
          >
              <IssueUP data={{}} parent={this}/>
          </Drawer>

          {/*推进页不同的区域 route*/}
          {routes.map((route, i) => {
              route.parent = this;
              return(
                  <RouteWithSubRoutes key={i} {...route}/>
              )
          })}
          {/*工作计划*/}
          <div className="work-plan">
            <WorkPlan prblmId={querystring.parse(this.props.location.search).id} parent={this}/>
          </div>
        </Scroller>
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default IssueAdvance
