import * as React from 'react';
/**
 * space css
 * you can set it on parent component props
 */
const SpaceRowStyle = {
    height: "0.6em",
    backgroundColor: "#EEEDED"
}
const SpaceRow = (props) => {
    var style = Object.assign({}, SpaceRowStyle, props)
    return (
        <div style={style}>
        </div>
    )
}

export default SpaceRow