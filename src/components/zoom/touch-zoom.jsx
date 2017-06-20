import * as React from 'react';
import getTwoPointDistance from './getTwoPointDistance';
import './index.css'
class TouchZoom extends React.Component {
    componentDidMount () {
        var zoom = this.refs.zoom;
        zoom.addEventListener('touchstart', (e) => {
            // 第一次点下去时的亮点距离
            var oldDis = getTwoPointDistance(e);
            var touchMove = function (e) {
                // 新的的两点距离
                var newDis = oldDis;
                if (e.targetTouches[0]) {
                   newDis = getTwoPointDistance(e);
                   var width = (newDis / oldDis * parseInt(zoom.style.width, 10));
                    if (width < 100) { 
                        width = 100;
                    } else if (width > 200) {
                        width = 200;
                    }
                   zoom.style.width = width + '%';
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
            <div className="zoom-wrap">
                <div ref="zoom" style={{width: "100%"}}>
                    {
                        (this.props.children && Array.isArray(this.props.children)) ? 
                            this.props.children.map((c) => c):
                            this.props.children
                    }
                </div>
            </div>
        )
    }
}

export default TouchZoom;