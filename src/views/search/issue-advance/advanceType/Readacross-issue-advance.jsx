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
    intl.setMsg([require('@/static/i18n').default, require('./locale')])
    return (
      <div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.IssueDescription')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              DCT变速箱-R档切换到N档时异响
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('ParentCurrentStep')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              Solution
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.Champion')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              刘平Liu Ping
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.RiskStatus')}: </label>
          </div>
          <div className="flex-col-10 right">
            <select name="" id="">
              <option value="1">白色</option>
              <option value="1">黄色</option>
              <option value="1">红色</option>
              <option value="1">绿色</option>
            </select>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('ParentIssueNo')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              EIR-R-K21-61-LIR-0044
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.ParentIssueSeverity')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>3</span>
          </div>
        </div>
        <SpaceRow height={6} />
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.RootCauseAnalysis')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>No enough space between beauty cover and CAC duct.No enough space between beauty cover and CAC duct.</span>
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
            <span></span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-5">
            <label htmlFor="">{intl.get('QMS.STSolutionBPDate')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span></span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-5">
            <label htmlFor="">{intl.get('QMS.STSolutionBPPhase')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span></span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.LTSolution')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span></span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.PlannedBPDate')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span></span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.PlannedBPPhase')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span></span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.ActuralBPDate')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span></span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-4">
            <label htmlFor="">{intl.get('QMS.ActuralBPPhase')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default ReadacrossIssueAdvance
