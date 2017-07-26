import * as React from 'react';
import './index.css';

interface CircleProps extends React.Props<{}> {
    value: string
}

const Circle = (props: CircleProps) => {
    var value: string = transformValue(props.value);
    const colors: Object = {
        'G': '#009966',
        'R': '#CC3366',
        'Y': '#CCCC66',
        'W': '#FFFFFF',
        'D': '#FF0000',
        undefined: '#FFF'
    }
    var bgColor: string =  colors[value];
    // 渐变色
    var bgImg: string = `-webkit-radial-gradient(45px 45px, circle cover, yellow, ${bgColor})`;
    if (value === 'W' || value === undefined ) {bgImg = ''}
    // when value === w style is different, Because the background also is white
    var wStyle: any = {
        spanColor: value === 'W' ? '#000' : '#FFF',
        divBorder: value === 'W' ? '1px solid #000' : '0px',
    }
    return (
        <div 
            className="circle text-center" 
            style={{backgroundColor: bgColor, border: wStyle.divBorder, backgroundImage: bgImg}}
        >
            <span className="circle-item" style={{color: wStyle.spanColor}}>
               {value}
            </span>
        </div>
    )
}

/**
 *  中文轉英文 後臺竟然返中文狀態，最坑的是有的是中文有得是英文
 *   白 W
 *   黄 Y
 *   红 R
 *   绿 G
 *   黑 B
 */

var transformValue = function (value: string): string {
    switch (value) {
        case '白':
            return 'W';
        case '黄':
            return 'Y';
        case '红':
            return 'R';
        case '绿':
            return 'G';
        case '黑':
            return 'B';
        default:
            return value;
    }
}

export default Circle;