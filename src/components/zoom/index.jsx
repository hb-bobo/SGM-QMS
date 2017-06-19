import * as React from 'react';

/**
 * 获取两点的距离(touch事件)
 * @param { Event } ev 
 * @return { number }
 */
var getTwoPointDistance = function (ev) {
    var x1 = ev.targetTouches[0].pageX;
    var y1 = ev.targetTouches[0].pageY;
    var x2 = ev.targetTouches[1].pageX;
    // var x2 = (ev.targetTouches[1] && ev.targetTouches[1].pageX) || 0;
    var y2 = ev.targetTouches[1].pageY;
    // var y2 = (ev.targetTouches[1] && ev.targetTouches[1].pageY) || 0;
    // 三角形 a b c;
    var a = x2 - x1;
    var b = y2 - y1;
    return Math.sqrt(a * a + b * b);
}

class Zoom extends React.Component {
    componentDidMount () {
        var zoom = this.refs.zoom;
        zoom.addEventListener('touchstart', (e) => {
            // 第一次点下去时的亮点距离
            var oldDis = getTwoPointDistance(e);
            var touchMove = function (e) {
                // 新的的两点距离
                var newDis = oldDis;
                if (e.targetTouches[1]) {
                   newDis = getTwoPointDistance(e);
                   var scale = newDis / oldDis;
                   if (scale < 1) { scale = 1 }
                   zoom.style.width = (scale * parseInt(zoom.style.width, 10)) + '%';
                }
            }
            var touchEnd = function (e) {
                zoom.removeEventListener('touchmove', touchMove);
                zoom.removeEventListener('touchend', touchEnd);
            }
            zoom.addEventListener('touchmove', touchMove);
            zoom.addEventListener('touchend', touchEnd);
        });
        
    }
    render () {
        return (
            <div ref="zoom" style={{width: "100%"}}>
                {
                    this.props.children && this.props.children.map((c) => c)
                }
            </div>
        )
    }
}

export default Zoom;