import * as React from 'react';
import PropTypes from 'prop-types';
// import { List, InputItem, WhiteSpace } from 'antd-mobile';
// import { createForm } from 'rc-form';
import SpaceRow from '@/components/space-row';
import { Link } from 'react-router-dom';
import intl from '@/components/intl';

export class EIRIssueAdvance extends React.Component {
  state = {
  }
  static defaultProps = {
    advanceData: {}
  }
  static propsType = {
    advanceData: PropTypes.object
  }
  componentDidMount () {
    console.log(this.props.parent)
  }
  render() {
    intl.setMsg(require('@/static/i18n').default);
    var issueData = this.props.parent.state.issueData;
    return (
      <div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.IssueDescription')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.prblmDesc}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.CurrentStep')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.crntPhase}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.Champion')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.crntRspnsUser}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.RiskStatus')}: </label>
          </div>
          <div className="flex-col-10 right">
            <select name="" id="" value={issueData.estimatePrblmStatus}>
              <option value="w">白色</option>
              <option value="Y">黄色</option>
              <option value="R">红色</option>
              <option value="G">绿色</option>
            </select>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.DiagnoseAssistance')}: </label>
          </div>
          <div className="flex-col-10 right">
            <Link to={"/search/assist?id="+issueData.prblmId}>
              {issueData.assistDiagnoseNum}
            </Link>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.SeverityLevel')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.prblmSeverity}
            </span>
          </div>
        </div>
        <SpaceRow height={6} />
        <div className="issue-advance-item flex-row">
          <div className="flex-col-5">
            <label htmlFor="">{intl.get('QMS.RootCauseAnalysis')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.rcAnalysis}
            </span>
          </div>
        </div>
        <SpaceRow height={6} />
        <div className="issue-advance-item-title">
          <span>{intl.get('QMS.Solution')}</span>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.STSolution')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.stSolDesc}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-5">
            <label htmlFor="">{intl.get('QMS.STSolutionBPDate')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.stBreakDate}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-5">
            <label htmlFor="">{intl.get('QMS.STSolutionBPPhase')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.stBreakPhase}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.LTSolution')}: </label>
          </div>
          <div className="flex-col-10 right">  
            <span>
              {issueData.ltSolutDesc}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.PlannedBPDate')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.planLtBreakDate}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.PlannedBPPhase')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.planLtBreakPhase}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.ActuralBPDate')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.acutalLtBreakDate}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.ActuralBPPhase')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.acutalLtBreakPhase}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default EIRIssueAdvance
