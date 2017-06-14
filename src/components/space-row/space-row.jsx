import * as React from 'react';
/**
 * space css
 * you can set it on parent component props
 */
const SpaceRowStyle = {
    height: "0.6em",
    backgroundColor: "#CCC"
}
const SpaceRow = (props) => {
    Object.assign(SpaceRowStyle, props)
    return (
        <div style={SpaceRowStyle}>
        </div>
    )
}

export default SpaceRow