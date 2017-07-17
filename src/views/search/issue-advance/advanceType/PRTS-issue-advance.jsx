import * as React from 'react';
import PropTypes from 'prop-types';
// import { List, InputItem, WhiteSpace } from 'antd-mobile';
// import { createForm } from 'rc-form';
import SpaceRow from '@/components/space-row';
import { Link } from 'react-router-dom';
import intl from '@/components/intl';

export class PRTSIssueAdvance extends React.Component {
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
    return (
      <div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.IssueDescription')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              HARNESS ASM-ECM & ENG WRG , ENG Comparpment - ENG harness to camshaft sensor interfere with CAC hose.
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.ProgramName')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span> U25
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.CurrentStep')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              Feedback
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.Champion')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              欧阳
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
            </select>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.DiagnoseAssistance')}: </label>
          </div>
          <div className="flex-col-10 right">
            <Link to="/search/assist">0</Link>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.SeverityLevel')}: </label>
          </div>
          <div className="flex-col-10 right">
            <span>2</span>
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
          <div className="flex-col-3">
            <label htmlFor="">{intl.get('QMS.LTSolution')}: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>	W/H routing to be changed, and beauty cover to be modified.</span>
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
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default PRTSIssueAdvance
