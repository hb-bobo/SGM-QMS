import * as React from 'react';

var clearDefaultStyle = {
    color: '#CCC'
}
const IconClear = (props) => {
    var svgStyle = Object.assign({}, clearDefaultStyle,props.style);
    var width = svgStyle.width || 200;
    var height = svgStyle.width || 200;
    if (props.show) {
        svgStyle.display = 'inline-block';
    } else {
        svgStyle.display = 'none';
    }

    return (
        <svg 
            className="icon icon-clear"
            style={svgStyle} 
            viewBox="0 0 1024 1024" 
            width={width} height={height}
            onClick = {props.onClick || null}
        >
            <path 
                d="M589.568 512l129.170286-129.170286a54.820571 54.820571 0 1 0-77.568-77.568L512 434.432l-129.170286-129.170286a54.820571 54.820571 0 1 0-77.568 77.568L434.432 512l-129.170286 129.170286a54.820571 54.820571 0 1 0 77.568 77.568L512 589.568l129.170286 129.170286a54.820571 54.820571 0 1 0 77.568-77.568L589.568 512zM512 1024C229.229714 1024 0 794.770286 0 512S229.229714 0 512 0s512 229.229714 512 512-229.229714 512-512 512z">
            </path>
        </svg>
    )
}

export default IconClear