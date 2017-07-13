import * as React from 'react';

var clearDefaultStyle = {
    color: '#000'
}
const IconArrow = (props) => {
    var svgStyle = Object.assign({}, clearDefaultStyle,props.style);
    var width = svgStyle.width || 50;
    var height = svgStyle.width || 50;

    svgStyle.display = 'inline-block';
    if (props.show === false) {
        svgStyle.display = 'none';
    }
    return (
        <svg 
            style={svgStyle}
            className={props.className || "icon"}
            viewBox="0 0 1024 1024" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            width={width}
            height={height}
        >
            <defs>
                <style type="text/css"></style>
            </defs>
            <path d="M548 106.951c0 23.395-18.964 42.359-42.36 42.359-23.391 0-42.358-18.964-42.358-42.359s18.967-42.359 42.358-42.359c23.395 0 42.36 18.965 42.36 42.359z"></path>
            <path d="M548 274.259c0 23.395-18.965 42.36-42.36 42.36-23.391 0-42.358-18.965-42.359-42.36s18.967-42.359 42.358-42.359c23.395 0 42.36 18.965 42.36 42.359z"></path>
            <path d="M548 441.566c0 23.395-18.964 42.359-42.36 42.359-23.391 0-42.358-18.964-42.358-42.359s18.967-42.36 42.359-42.36c23.396 0.001 42.36 18.965 42.36 42.36z"></path>
            <path d="M548 608.875c0 23.394-18.965 42.36-42.36 42.36-23.391 0-42.358-18.965-42.359-42.36s18.967-42.36 42.359-42.36c23.395 0 42.36 18.965 42.36 42.36z"></path>
            <path d="M534.721 952.288l263.819-263.818c12.089-12.095 8.487-35.304-8.057-51.843-16.539-16.538-39.753-20.149-51.846-8.056l-226.642 226.64-226.637-226.634c-12.087-12.092-35.31-8.481-51.84 8.056-16.541 16.539-20.147 39.746-8.066 51.843l263.821 263.818c5.708 5.715 13.919 7.88 22.721 6.876 8.804 0.999 17.006-1.167 22.727-6.882z"></path>
        </svg>
    )
}

export default IconArrow