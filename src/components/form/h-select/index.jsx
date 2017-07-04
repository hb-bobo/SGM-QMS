import * as React from 'react';
import PropTypes from 'prop-types';
import objectArray from '@/utils/array/objectArray';
import '../style/common.css';
var containerStyle = {
}
var selectStyle = {}

class HSelect extends React.Component {
    static defaultProps = {
        options: [],
        emptyText: '请选择'
    }
    static propTypes = {
        options: PropTypes.array,
        onChange: PropTypes.func,
        emptyText: PropTypes.string,
        containerStyle: PropTypes.object, // 容器样式覆盖,也就是div
        inputStyle: PropTypes.object,
    }

    state = {
        value: '',
        controllable: false
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
            emptyText
        } = this.props;

        var optionsData = objectArray(options, {
            keyName: 'value',
            valueName: 'text'
        });
        if (!this.state.controllable) {
            value = this.state.value;
        }
        // First empty
        optionsData.unshift({value: '', text: emptyText});
        return (
            <div className="form-container" style={Object.assign(containerStyle, this.props.containerStyle)}>
                <select
                    ref="select"
                    className="form-element"
                    style={Object.assign(selectStyle, this.props.selectStyle)}
                    value={value}
                    onChange={this.handleChange} 
                >
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