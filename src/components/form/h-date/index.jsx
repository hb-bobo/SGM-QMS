import * as React from 'react';
import PropTypes from 'prop-types';
import IconClear from '../../icon/clear';
import dateFormat from '@/utils/format/dateFormat';
import DatePicker from 'react-mobile-datepicker';
import '../style/common.css';
var containerStyle = {
    height: '25px'
}
var inputStyle = {  
}
var dateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '102%',
    height: '100%',
    paddingRight: '26px',
    opacity: 0,
    zIndex: 10
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

    componentWillMount () {
        // 这代表可控
        if (this.props.onChange !== undefined && this.props.value !== undefined) {
            this.setState({
                controllable: true
            });
        }
    }
    componentWillReceiveProps (nextProps) {
         if (!this.state.controllable) {
            // 不可控用defaultValue
            this.setState({
                value: nextProps.defaultValue
            });
        }
    }
    handleChange = (time) => {
        var value = dateFormat(time, 'yyyy-MM-dd');
        var showClear = false;
        if (value.length > 0 && this.props.clear === true) {
            showClear = true;
        }
        if (this.state.controllable) {
            this.props.onChange({target: {value: value}});
            this.setState({
                showClear: showClear,
                isOpen: false,
            });
        } else {
            this.setState({
                value: value,
                isOpen: false,
                showClear: showClear
            });
        }
    }
    /**
     * 清空所有值
     */
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
    /**
     * 激活日期选择器
     */
    handleClick = () => {
		this.setState({ isOpen: true });
	}
    /**
     * 取消日期选择器
     */
	handleCancel = () => {
		this.setState({ isOpen: false });
	}

    render () {
        var {
            value,
            disabled,
            // dateType
        } = this.props;
        // uncontrollable use defaultValu,  defaultValu set in componentWillMount()
        if (!this.state.controllable) {
            value = this.state.value;
        }
        // 清空后new Date(value) 会变成无效日期，则设为当前日期
        var time = value ? new Date(value) : new Date();

        dateStyle.paddingRight = !this.state.showClear? '5px' : '24px';

        return (
            <div className="form-container" style={Object.assign(containerStyle, this.props.containerStyle)}>
                <input
                    style={Object.assign(inputStyle, this.props.inputStyle)}
                    ref="input"
                    type="text"
                    className="form-element"
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                    disabled={disabled}
                    readOnly
                    value={value}

                />
                {/* <input 
                    ref="input"
                    className="form-element"
                    type={dateType}
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                    style={Object.assign({}, dateStyle)} 
                /> */}
                <DatePicker
                    theme="ios"
                    value={time}
					isOpen={this.state.isOpen}
					onSelect={this.handleChange}
					onCancel={this.handleCancel}
                />

                    
                <svg 
                    className="icon icon-date" 
                    style={{
                        display: !this.state.showClear ? 'inline-block' : 'none'
                    }}
                    onClick={this.handleClick}
                >
                    <use xlinkHref="#icon-date"></use>
                </svg>
 
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