import * as React from 'react';

var saveDefaultStyle = {
    color: '#000'
}
const IconSave = (props) => {
    var svgStyle = Object.assign({}, saveDefaultStyle,props.style);
    var width = svgStyle.width || 50;
    var height = svgStyle.width || 50;
    svgStyle.display = 'inline-block';
    if (props.show === false) {
        svgStyle.display = 'none';
    }
    return (
        <svg 
            style={svgStyle}
            viewBox="0 0 1024 1024"
            width={width}
            height={height}
            className={props.className || "icon"}
        >
            <path d="M252.460656 688.145737l503.776065 0 0 251.888524L252.460656 940.034261C252.460656 940.034261 252.460656 688.145737 252.460656 688.145737zM840.199431 940.035441 840.199431 667.157173c0-17.492043-6.122254-32.360515-18.366763-44.605024-12.244509-12.244509-27.112981-18.366763-44.605024-18.366763L231.469732 604.185386c-17.492043 0-32.360515 6.122254-44.605024 18.366763-12.244509 12.244509-18.366763 27.112981-18.366763 44.605024l0 272.878464L84.535038 940.035638 84.535038 100.408141l83.962907 0 0 272.878464c0 17.49224 6.122254 32.360515 18.366763 44.605024 12.244509 12.244509 27.112981 18.366763 44.605024 18.366763l377.832295 0c17.492043 0 32.360515-6.122254 44.605024-18.366763 12.244509-12.244509 18.366763-27.112784 18.366763-44.605024L672.273814 100.408141c6.559221-0.000787 15.086759 2.18562 25.582811 6.559221 10.495855 4.373601 17.930386 8.746808 22.3032 13.119622l184.323867 184.323867c4.373601 4.372814 8.746808 11.916292 13.119622 22.630237 4.372617 10.713945 6.559221 19.132143 6.559221 25.254397l0 587.738972-83.962907 0L840.199628 940.035441zM582.07892 346.064481c-4.153937 4.154724-9.073648 6.232184-14.758936 6.232184l-125.943771 0c-5.684501-0.000787-10.604212-2.078247-14.758936-6.232184-4.154724-4.153937-6.231988-9.073648-6.231988-14.758936L420.38529 121.399065c0.000787-5.684501 2.07805-10.604212 6.231988-14.758936 4.153937-4.154724 9.073648-6.232184 14.758936-6.232184l125.943771 0c5.684501 0.000787 10.604212 2.078247 14.758936 6.232184 4.154724 4.153937 6.231988 9.073648 6.231988 14.758936l0 209.906481C588.310121 336.990243 586.232857 341.909757 582.07892 346.064481zM1008.126425 352.297845c0-17.492043-4.373207-36.733723-13.119622-57.724646-8.746415-20.990923-19.241876-37.608836-31.486582-49.853345L779.851805 61.051438c-12.244509-12.244509-28.862421-22.73997-49.853345-31.486582-20.990923-8.746415-40.232407-13.119819-57.724646-13.119622L63.543918 16.445234c-17.492043 0-32.360515 6.122254-44.605024 18.366763C6.694386 47.056506 0.572131 61.924978 0.572131 79.417021l0 881.608164c0 17.492043 6.122254 32.360515 18.366763 44.605024 12.244509 12.244705 27.112981 18.366763 44.605024 18.366763l881.608164 0c17.492043 0 32.360515-6.122254 44.605024-18.366763 12.244509-12.244509 18.36696-27.112981 18.366763-44.605024L1008.123869 352.295485 1008.126425 352.297845z">
            </path>
        </svg>
    )
}

export default IconSave