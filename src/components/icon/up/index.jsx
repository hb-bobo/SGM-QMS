import * as React from 'react';
/**
 * IconUp css
 * you can set it on parent component props
 */
var style = {
    position: 'relative',
    display: 'inline-block',
}
var textStyle = {
    position: 'absolute',
    left: '49%',
    top: '30%',
    width: '2px',
    fontSize: '12px'
}
const IconUp = (props) => {
    var containerStyle = Object.assign({}, style, props.style)
    return (
        <div style={containerStyle}>
            <svg className="icon icon-up" aria-hidden="true">
                <use xlinkHref="#icon-up"></use>
            </svg>
            <span style={textStyle}>{props.value}</span>
        </div>
    )
}

export default IconUp