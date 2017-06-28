import * as React from 'react';
import './index.css';

interface CircleProps extends React.Props<{}> {
    value: string
}
const Circle = (props: CircleProps) => {
    const colors: Object = {
        'G': '#009966',
        'R': '#CC3366',
        'Y': '#CCCC66',
        'W': '#FFFFFF',
        'D': '#FF0000',
        undefined: '#FFF'
    }
    var bgColor: string =  colors[props.value];
    // 渐变色
    var bgImg: string = `-webkit-radial-gradient(45px 45px, circle cover, yellow, ${bgColor})`;
    if (props.value === 'W' || props.value === undefined ) {bgImg = ''}
    // when value === w style is different, Because the background also is white
    var wStyle: any = {
        spanColor: props.value === 'W' ? '#000' : '#FFF',
        divBorder: props.value === 'W' ? '1px solid #000' : '0px',
    }
    return (
        <div 
            className="circle text-center" 
            style={{backgroundColor: bgColor, border: wStyle.divBorder, backgroundImage: bgImg}}
        >
            <span className="circle-item" style={{color: wStyle.spanColor}}>
               {props.value}
            </span>
        </div>
    )
}

export default Circle;