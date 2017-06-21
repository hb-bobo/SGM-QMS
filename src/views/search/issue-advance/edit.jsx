import * as React from 'react';
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

class WorkPlanEdit extends React.Component {
  state = {
  }
  componentWillMount () {
    var model = this.props.match.params.id === 'edit' ? '编辑' : '新增';
    this.props.parent.setState({
      title: model + '工作计划',
      isIndex: false
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="work-plan-edit-from">
        <List>
          <InputItem
              {...getFieldProps('inputclear')}
              clear
              placeholder="displayed clear icon while typing"
            >标题
          </InputItem>
          <WhiteSpace></WhiteSpace>
        </List>
      </div>
    );
  }
}

const WorkPlanEditWrapper = createForm()(WorkPlanEdit);

export default WorkPlanEditWrapper;