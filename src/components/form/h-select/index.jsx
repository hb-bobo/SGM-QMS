import * as React from 'react';
import PropTypes from 'prop-types';

import '../style/common.css';

var containerStyle = {
}
var selectStyle = {}

class HSelect extends React.Component {
    static defaultProps = {
        options: [],
        emptyText: '请选择',
        isFirstEmpty: true
    }
    static propTypes = {
        options: PropTypes.array,
        onChange: PropTypes.func,
        emptyText: PropTypes.string,
        containerStyle: PropTypes.object, // 容器样式覆盖,也就是div
        inputStyle: PropTypes.object,
        isFirstEmpty: PropTypes.bool,
    }
    static contextTypes = {
        language: PropTypes.string
    }
    state = {
        value: '',
        controllable: false // 默认不可控
    }

    componentWillMount () {
        // 这代表可控
        if (this.props.onChange !== undefined && this.props.value !== undefined) {
            this.setState({
                controllable: true
            });
        } else {
            this.setState({
                value: this.props.defaultValue
            });
        }
    }
    handleChange = (e) => {
        var value = e.target.value;
        if (this.state.controllable) {
            this.props.onChange(e);
        } else {
            this.setState({
                value: value
            });
        }
    }

    render () {
        var {
            value,
            options,
            emptyText,
            isFirstEmpty
        } = this.props;
        var optionsData = options;
        if (options.length !== 0 && options[0].value === undefined && options[0].text === undefined) {
            throw Error('格式有误: -> [{text: any, value: any}]');
        }
        
        if (!this.state.controllable) {
            value = this.state.value;
        }

        return (
            <div className="form-container" style={Object.assign(containerStyle, this.props.containerStyle)}>
                <select
                    ref="select"
                    className="form-element"
                    style={Object.assign(selectStyle, this.props.selectStyle)}
                    value={value}
                    onChange={this.handleChange} 
                >
                    {/*第一条为空  */
                        isFirstEmpty ? <option value="">{emptyText}</option> : null
                    }
                    {
                        optionsData.map((o, i) => {
                            return (
                                <option key={i} value={o.value}>
                                    {o.text}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }
}

export default HSelect