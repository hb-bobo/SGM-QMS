import * as React from 'react';
import PropTypes from 'prop-types';
// import { List, InputItem, WhiteSpace } from 'antd-mobile';
// import { createForm } from 'rc-form';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

export class VOCIssueAdvance extends React.Component {
  state = {
  }
  static defaultProps = {
  }
  static propsType = {
    parent: PropTypes.instanceOf(React.Component).isRequired
  }
  render() {
    intl.setMsg(require('@/static/i18n').default)
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
        <SpaceRow height={6} />
        <div className="issue-advance-item-title">
          <span>Enabler</span>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor=""></label>
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
export default VOCIssueAdvance
