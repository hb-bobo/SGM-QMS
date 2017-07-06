import * as React from 'react';
import PropTypes from 'prop-types';
// import { List, InputItem, WhiteSpace } from 'antd-mobile';
// import { createForm } from 'rc-form';
import SpaceRow from '@/components/space-row';

export class QDCPIRIssueAdvance extends React.Component {
  state = {
  }
  static defaultProps = {
    advanceData: {}
  }
  static propsType = {
    advanceData: PropTypes.object
  }
  render() {
    return (
      <div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">问题描述: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              HARNESS ASM-ECM & ENG WRG , ENG Comparpment - ENG harness to camshaft sensor interfere with CAC hose.
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">问题阶段: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              Feedback
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">责 任 人: </label>
          </div>
          <div className="flex-col-10 right">
            <span>
              欧阳
            </span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">风险状态: </label>
          </div>
          <div className="flex-col-10 right">
            <select name="" id="">
              <option value="1">白色</option>
            </select>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">协助诊断: </label>
          </div>
          <div className="flex-col-10 right">
            <a href="void()">3</a>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">问题等级: </label>
          </div>
          <div className="flex-col-10 right">
            <span>2</span>
          </div>
        </div>
        <SpaceRow height={6} />
        <div className="issue-advance-item flex-row">
          <div className="flex-col-5">
            <label htmlFor="">根本原因分析: </label>
          </div>
          <div className="flex-col-10 right">
            <span>No enough space between beauty cover and CAC duct.No enough space between beauty cover and CAC duct.</span>
          </div>
        </div>
        <SpaceRow height={6} />
        <div className="issue-advance-item-title">
          <span>遏制措施</span>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">短期措施: </label>
          </div>
          <div className="flex-col-10 right">
            <span></span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-3">
            <label htmlFor="">长期措施: </label>
          </div>
          <div className="flex-col-10 right"> 
            <span>	W/H routing to be changed, and beauty cover to be modified.</span>
          </div>
        </div>
        <div className="issue-advance-item flex-row">
          <div className="flex-col-1">
            <div>
              <span>计划完成时间: </span>
              <span className="right"></span>
            </div>
          </div>
          <div className="flex-col-1">
            <div>
              <span>实际完成时间: </span>
              <span className="right"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default QDCPIRIssueAdvance
