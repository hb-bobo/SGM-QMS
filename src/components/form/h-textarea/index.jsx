import * as React from 'react';
import PropTypes from 'prop-types';
import IconClear from '../../icon/clear';
import '../style/common.css';
var containerStyle = {
}
var textareaStyle = {}
var iconStyle = {
}
class HTextarea extends React.Component {
    static defaultProps = {
        type: 'text',
        clear: false,
        disabled: false,
        rows: 4,
        cols: 21
    }
    static propTypes = {
        rows: PropTypes.number,
        cols: PropTypes.number,
        clear: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
        containerStyle: PropTypes.object, // 容器样式覆盖,也就是div
        textareaStyle: PropTypes.object,
        iconStyle: PropTypes.object,
    }

    state = {
        showClear: false,
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
            // 不可控用defaultValue
            this.setState({
                value: this.props.defaultValue
            });
        }
    }
    handleChange = (e) => {
        var value = e.target.value;
        var showClear = false;
        if (value.length > 0) {
            showClear = true;
        }
        if (this.state.controllable) {
            this.props.onChange(e);
            this.setState({
                showClear: showClear
            });
        } else {
            this.setState({
                value: value,
                showClear: showClear
            });
        }
    }
    clearValue = () => {
        // 一般是清空父级的值，让父级可控
        if (this.state.controllable) {
            this.props.onChange({target: {value: ''}});
        } else {
            this.refs.textarea.value = '';
        }
        
        this.setState({
            showClear: false
        });
    }
    render () {
        var {
            rows,
            cols,
            value,
            disabled
        } = this.props;
        // uncontrollable use defaultValu,  defaultValu set in componentWillMount()
        if (!this.state.controllable) {
            value = this.state.value;
        }
        return (
            <div className="form-container" style={Object.assign(containerStyle, this.props.containerStyle)}>
                <textarea
                    style={Object.assign(textareaStyle, this.props.textareaStyle)}
                    className="form-element"
                    cols={cols} 
                    rows={rows}
                    ref="textarea" 
                    onChange={this.handleChange} 
                    value={value}
                    disabled={disabled}
                >

                </textarea>
                <IconClear 
                    style={Object.assign(iconStyle, this.props.iconStyle)}
                    className="icon-clear"
                    show={this.state.showClear} 
                    onClick={this.clearValue}
                />
            </div>
        )
    }
}

export default HTextarea