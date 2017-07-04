import * as React from 'react';
import PropTypes from 'prop-types';
import IconClear from '../../icon/clear';
// import getTime from '@/utils/format/getTime';
import '../style/common.css';
var containerStyle = {
}
var inputStyle = {  
}
var dateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    paddingRight: '26px',
    opacity: 0
}
var iconStyle = {
}
class HDate extends React.Component {
    static defaultProps = {
        dateType: 'date',
        clear: false,
        disabled: false
    }
    static propTypes = {
        dateType: PropTypes.string,
        clear: PropTypes.bool,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        containerStyle: PropTypes.object, // 容器样式覆盖,也就是div
        inputStyle: PropTypes.object,
        iconStyle: PropTypes.object,
    }

    state = {
        showClear: false,
        value: '',
        controllable: false
    }

    componentWillMount () {console.log(1)
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
            this.refs.input.value = '';
        }
        
        this.setState({
            showClear: false
        });
    }
    /* 选择了时间赋值给input */
    dateSelect = (e) => {
        var value = e.target.value;
        this.setState({
            value: value
        });
    }
    render () {
        var {
            value,
            disabled,
            dateType
        } = this.props;
        // uncontrollable use defaultValu,  defaultValu set in componentWillMount()
        if (!this.state.controllable) {
            value = this.state.value;
        }
        dateStyle.paddingRight = !this.state.showClear? '5px' : '22px';
        return (
            <div className="form-container" style={Object.assign(containerStyle, this.props.containerStyle)}>
                <input
                    style={Object.assign(inputStyle, this.props.inputStyle)}
                    ref="input"
                    type="text"
                    className="form-element"
                    onChange={this.handleChange}
                    disabled={disabled}
                    value={value}

                />
                <input 
                    ref="input"
                    className="form-element"
                    type={dateType}
                    onChange={this.handleChange}
                    style={Object.assign({}, dateStyle)} 
                />
                {
                    !this.state.showClear ? 
                        <svg className="icon icon-date">
                            <use xlinkHref="#icon-date"></use>
                        </svg> :
                        null
                }
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

export default HDate