import * as React from 'react';
import { RouteWithSubRoutes } from '@/router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { upWorkPlanListData, setIssueSaveData } from '@/store/actions';
import './index.css';
// ui框架
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Drawer from 'material-ui/Drawer';
import { Toast } from 'antd-mobile';
// import { WingBlank, Button, Icon } from 'antd-mobile';
//components
import Scroller from '@/components/scroller';
import WorkPlan from './work-plan';
import { POST } from '@/plugins/fetch';
import IconUp from '@/components/icon/up';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
import querystring from '@/utils/tools/querystring';
import IconSave from '@/components/icon/save';
// views
import HotUp from './hot-up';
import IssueUP from './issue-up';
// 设置本地语言包
import(/* webpackChunkName: "intl" */ './locale')
    .then((intlMsg) => {
        intl.setMsg(intlMsg);
    });

// 使用Drawer 返回时不应该用history.go(-1);此组件只是相当于一个model，但又得在效果上相当于返回Drawer消失

/**
 * 问题推进页
 */
@connect(
    // mapStateToProps
    (state) => ({
      workPlanData: state.issueAdvance.workPlanData,
      issueSaveData: state.issueAdvance.issueSaveData
    }),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            upWorkPlanListData,
            setIssueSaveData
        }, dispatch)
    })
)
export class IssueAdvance extends React.Component {

  state = {
    title: intl.get('QMS.' + this.props.advType + 'Report'),
    isIndex: true,
    hotUpOpen: false,
    issueUPOpen: false,
    workPlanOpen: false, // 是否打开工作计划编辑新增面板
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
    var id = querystring.parse(this.props.location.search).problemId;

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
    // TODO
    var res = {"data":{"acutalDemonstration":"","allLaborcode":"","allPartNum":"","assistDiagnoseNum":0,"champion":"","championDept":"","championDesignee":"","closureCode":"","cmplnCatName":"","cmplnType":"","count":0,"createBy":"","createTime":"","crntAprvUser":"Christopher Lata","crntPhase":"Implementation","crntRspnsDept":"","crntRspnsUser":"","crntStepAge":"","crntStepChampion":"","crntStepStartDate":"","crntStepStatus":"","cstmrDetect":"","defAprvDate":"","defStartDate":"","defSubmitDate":"","dept":"","deptId":"","eirPrblmNo":"","engRpo":"","estimatePrblmStatus":"W","ewoInfo":"","ewoNum":"","ewoType":"","failMode":"","failureMode":"","fbAprvDate":"","fbChampion":"","fbDaysInStep":"","fbStartDate":"","fbSubmitDate":"","firstIncidengDescritption":"","hardwareStage":"","hotLevel":"3","impAprvDate":"","impChampion":"","impDaysInStep":"263","impStartDate":"","impSubmitDate":"","impactedPrjctNum":"","impactedProdLine":"","implementByEvent":"","inStockDay":0,"isEff":0,"isRcmndPrblm":0,"issueAge":"","issueClosedDate":"","issueType":"","lastUpdateBy":"","lastUpdateDate":"","linkDfmeaDrbfm":"","llNum":"","llStatus":"","ltActlBreakDate":"","ltActlBreakPhase":"","ltActlBreakSource":"","ltPlanBreakDate":"","ltPlanBreakPhase":"","ltPlanBreaksource":"","ltSolut":"HMI SW integrated modifications to prevent the \"Update Media\" screen in E3 SW.","mainlyCausedBy":"","modelYear":"","originationDate":"","originatorDept":"","originatorName":"","param1":"","param2":"","param3":"","param4":"","param5":"","partFinishMile":"","partFinishPrcnt":"","partTestMile":"","partTestPrcnt":"","planDemonstration":"","pqm":"","prblmDesc":"MODULE ASM , HMI - Screen is blank during start up","prblmFrequency":"","prblmId":"197458","prblmSeverity":"2","prblmSource":"PRTS","prblmStatus":"W","prcAprvDate":"","prcAwaitingAprv":"0","prcChampion":"","prcSubmitDate":"","prjctId":"","prjctName":"","prjctNum":"","problemWorkPlans":[],"prodLine":"","programCode":"","programId":"","rcAprvDate":"","rcChampion":"","rcDayInStep":"0","rcDesignee":"","rcLastCommnt":"The \"Update Media Screen\" was a discovered issue on the D6 and E2 HMI SW sets.  The resolution of this issue was integrated in the E3 HMI SW.","rcStartDate":"","rcSubmitDate":"","rcmndReason":"","readAcrossNum":"","readacross":"","remark":"","reviewStatus":"","riseLevel":"3","rootCauseAnalysis":"","rptTime":"2017-08-30","salesRegion":"","silPrblmNo":"","solAprvDate":"","solChampion":"","solDaysInStep":"0","solDesignee":"","solFixPrblm":"","solLastCmt":"","solStartDate":"","solSubmitDate":"","solutType":"","sourceLevel1":"","sourceLevel2":"","sourceLevel3":"","sourcePrblmId":"31110","sourcePrblmNo":"1836656","stBreakDate":"","stBreakPhase":"","stSolut":"","status":"","subPrjctId":"","totalOpenDate":0,"trnsmsRpo":"","twoInfo":"","type":"","updateBy":"","updateTime":"","userJudgeFlag":"Y","vppsLevel3":"","vppsLevelFour":"","vppsLevelOne":"","vppsLevelThree":"","vppsLevelTwo":"","yearMonth":"","yearMonthEnd":""},"success":true};
    this.setState({
      issueData: res.data || {},
      pc: res.pc
    });
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
            issueData: res.data || {},
            pc: pc
          });
          this.props.actions.upWorkPlanListData({
            action: 'update',
            value: res.workplan
          });
        }
    });

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

  componentWillUnmount () {
    this.$store.dispatch({
      type: 'clearOldtabValue',
      payload: false
    });
  }

  /**
   * bar 返回
   */
  back = () => {
    // 纠正 Drawer 返回
    if (this.state.workPlanOpen) {
      this.setState({
        workPlanOpen: false,
        isIndex: true,
      });
      return;
    }
    if (this.state.hotUpOpen) {
      this.setState({
        hotUpOpen: false,
        isIndex: true,
      });
      return;
    }
    if (this.state.issueUPOpen) {
      this.setState({
        issueUPOpen: false,
        isIndex: true,
      });
      return;
    }
    this.props.history.go(-1);
  }
  /**
   * 热点上升
   */
  goHotUp = () => {
    this.topCtrl('/mproblem/getMaxReviewLog', 'HotEscalate', 'hotUpOpen');
  }
  /**
   * 问题上升
   */
  goIssueUp = () => {
    this.topCtrl('/mproblem/getMaxUpgradeLog', 'IssueEscalate', 'issueUPOpen');
  }
  /**
   * 顶部的操作 热点上升，问题上升
   * @param {string} url
   * @param {string} titleIntl i18n
   * @param {string} open key
   */
  topCtrl = (url, titleIntl, stateKey) => {
    this.setState({
            [stateKey]: true,
            title: intl.get(titleIntl),
            isIndex: false
          });
      POST(url, {
        data: {
          id: this.state.issueData.prblmId
        }
      }).then((res) => {
        if (res.success === true) {
          return res.result;
        } else {
          Toast.info('操作失败');
        }
      }).then((result) => {
        if(result === 'C') {
            Toast.info('已存在未审核的申请')
        } else {
          this.setState({
            [stateKey]: true,
            title: intl.get(titleIntl),
            isIndex: false
          });
          return false
        }
      })
  }
    
  /**
   * 保存操作
   * @param {?Object} 不同的参数
   */
  
  save = (data) => {
    var issueSaveData = this.props.issueSaveData;
    var issueData = this.state.issueData;
    if (Object.keys(issueSaveData).length === 0) {
      Toast.info('未改变');
      return false;
    }
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    POST('/mproblem/saveProblem', {
      headers,
      data: {
        prblmId: issueData.prblmId,
        PrblmStatus: issueData.estimatePrblmStatus,
        ...data
      }
    }).then((res) => {
      if (res.success === true) {
        Toast.info('保存成功');
      } else {
        Toast.info('保存失败');
      }
    })
  }
  render () {

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
              <IconButton onClick={this.back}>
                  <NavigationArrowBack color={'#FFF'}/>
              </IconButton>
            }
        />
        {/* <SilkScroller
            preventDefault={false}
            useToTop={false}
            ref="scorller"
        >
         */}
        <Scroller
            autoSetHeight={true}
            bounce={false}
        > 
          {/*顶部*/}
          <div className={this.state.isIndex ? "advance-top flex-row" : "advance-top flex-row hide"}>
            <div className="flex-col-5">
              <span>{intl.get('QMS.IssueNo')}: </span>
              <span style={{marginLeft: '1.4em', color: '#6AC4F6'}}>
                {this.state.issueData.sourcePrblmNo}
              </span>
            </div>
            <SpaceRow height={50} width="1px" backgroundColor="#EEEDED"/>
            <div className="flex-col-5">
              <span onClick={() => this.save()}>
                <IconSave style={{width: 39, height: 46, color:'#676767', marginLeft: '6px'}}></IconSave>
              </span>
              <span onClick={this.goHotUp} style={{display: this.state.advType === 'VOC' ? "none" : "inline-block"}}>
                <IconUp value="热点" style={{marginLeft: '4px'}} > </IconUp>
              </span>
              <span onClick={this.goIssueUp}>
                <IconUp value="问题" style={{marginLeft: '4px'}}> </IconUp>
              </span>
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
          <div className="work-plan">
            <WorkPlan
              prblmId={querystring.parse(this.props.location.search).problemId}
              parent={this}
              workPlanOpen={this.state.workPlanOpen}
            />
          </div> 
        </Scroller>

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
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default IssueAdvance
