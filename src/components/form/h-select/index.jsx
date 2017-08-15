import * as React from 'react';
import PropTypes from 'prop-types';

import '../style/common.css';

var containerStyle = {
    height: '25px'
}
var selectStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    height: '100%',
    width: '100%',
    border: 0,

}

var inputStyle = {
    width: '100%',
    height: '100%',
    border: '1px solid #CCC',
    paddingRight: '4px'
}
class HSelect extends React.Component {
    static defaultProps = {
        options: [],
        emptyText: '请选择',
        isFirstEmpty: true,
    }
    static propTypes = {
        containerStyle: PropTypes.object, // 容器样式覆盖,也就是span
        options: PropTypes.array,
        onChange: PropTypes.func,
        callBack: PropTypes.func, // 不可控时的change事件
        emptyText: PropTypes.string, // 空的时候的文字
        inputStyle: PropTypes.object,
        isFirstEmpty: PropTypes.bool, // 第一个options是否为空(‘请选择’)
        style: PropTypes.object
    }
    static contextTypes = {
        language: PropTypes.string
    }
    state = {
        value: '',
        controllable: false // 默认不可控
    }

    componentWillReceiveProps (nextProps) {
        // 这代表可控
        if (nextProps.onChange !== undefined && nextProps.value !== undefined) {
            this.setState({
                controllable: true
            });
        } else if (this.props.defaultValue !== undefined) {
            this.setState({
                value: nextProps.defaultValue
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
            if (this.props.callBack) {
                this.props.callBack(value)
            }
        }
    }

    render () {
        var {
            value,
            options,
            emptyText,
            isFirstEmpty,
            style
        } = this.props;
        var optionsData = options;
        if (options.length !== 0 && options[0].value === undefined && options[0].text === undefined) {
            throw Error('格式有误: -> [{text: any, value: any}]');
        }
        
        if (!this.state.controllable) {
            value = this.state.value;
        }

        var selectedItem = {};
        for (let i = 0; i < optionsData.length; i ++) {
            if (String(optionsData[i].value) === String(value)) {
                selectedItem = optionsData[i];
                break;
            }
        }
        var inputText = (selectedItem.text === undefined && isFirstEmpty === true) ? emptyText : selectedItem.text;
        if (inputText === undefined) {
            inputText = '';
        }

        return (
            <span className="form-container" style={Object.assign({}, containerStyle, this.props.containerStyle)}>
                <div style={{height: '100%'}}>
                    <input
                        style={Object.assign(inputStyle, style)}
                        type="text"
                        onChange={() => {}}
                        value={inputText}
                    />
                    <span style={{position: 'absolute', right: '10px', top: '25%'}}>
                        <svg className="icon" style={{}} viewBox="0 0 1024 1024" width="200" height="200">
                            <path d="M511.609097 961.619254M511.906879 662.759609L511.906879 662.759609 129.831974 280.679587c-14.788821-14.762215-38.777165-14.762215-53.585429 0-14.788821 14.812357-14.788821 38.799678 0 53.607942l405.851425 405.805376c0.867764 1.107217 1.824555 2.190899 2.843768 3.206018 14.808264 14.788821 38.795585 14.788821 53.585429 0l408.230612-408.226518c14.807241-14.808264 14.807241-38.795585 0-53.584406-14.767332-14.785751-38.754652-14.785751-53.562916 0L511.906879 662.759609 511.906879 662.759609zM511.906879 662.759609">
                                
                            </path>
                        </svg>
                    </span>
                </div>
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
            </span>
        )
    }
}

export default HSelect