import * as React from 'react';
import PropTypes from 'prop-types';
// import { List, InputItem, WhiteSpace } from 'antd-mobile';
// import { createForm } from 'rc-form';

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
    return (
      <div>
        PRTS
        {this.props.advanceData.id}
      </div>
    );
  }
}
// const AdvanceWrap = createForm()(Advance);
export default PRTSIssueAdvance
