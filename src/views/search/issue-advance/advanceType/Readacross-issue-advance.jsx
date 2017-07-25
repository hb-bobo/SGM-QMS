import * as React from 'react';
import PropTypes from 'prop-types';
// import { List, InputItem, WhiteSpace } from 'antd-mobile';
// import { createForm } from 'rc-form';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

export class ReadacrossIssueAdvance extends React.Component {
  state = {
  }
  static defaultProps = {
    advanceData: {}
  }
  static propsType = {
    advanceData: PropTypes.object
  }
  render() {
    intl.setMsg(require('@/static/i18n').default, require('./locale'))
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
            <label htmlFor="">{intl.get('ParentCurrentStep')}: </label>
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
            <label htmlFor="">{intl.get('ParentIssueNo')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.parentPrblmNo}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.ParentIssueSeverity')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.parentPrblmServerity}
            </span>
          </div>
        </div>
        <SpaceRow height={6} />
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.RootCauseAnalysis')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.rootCauseAnalysis}
            </span>
          </div>
        </div>
        <SpaceRow height={6} />
        <div className="issue-advance-item-title">
          <span>{intl.get('QMS.Solution')}</span>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.STSolution')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              {issueData.shortMsr}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-5">
            <label htmlFor="">{intl.get('QMS.STSolutionBPDate')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.shortBreakDate}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-5">
            <label htmlFor="">{intl.get('QMS.STSolutionBPPhase')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.shortBreakPhase}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.LTSolution')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.longMsr}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.PlannedBPDate')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.frcstBreakDate}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.PlannedBPPhase')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.frcstBreakPhase}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.ActuralBPDate')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.actlBreakDate}
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.ActuralBPPhase')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>
              {issueData.actlBreakPhase}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default ReadacrossIssueAdvance
