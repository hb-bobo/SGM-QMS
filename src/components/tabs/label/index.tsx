import * as React from 'react';
import LabelProps from './propTypes';

var labelDefaultStyle: Object = {
    maxWidth: '12em',
    overflow: 'hidden',
}
const Label = (props: LabelProps) => {
    var labelStyle = Object.assign({}, props.style, labelDefaultStyle);
    return (
        <span style={labelStyle}>
            {props.value}
        </span>
    )
}

export default Label