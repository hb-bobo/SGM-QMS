import * as React from 'react';
import PropTypes from 'prop-types';
import getTwoPointDistance from './getTwoPointDistance';
import './index.css';
class TouchZoom extends React.Component {
    static propTypes = {
        zoomMode: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.array
        ]),
        maxWidth: PropTypes.number
    }
    static defaultProps = {
        zoomMode: 'width',
        maxWidth: 200,
        minWidth: 100
    }
    componentDidMount () {
        var zoom = this.refs.zoom;
        var {
            zoomMode,
            maxWidth,
            minWidth
        } = this.props;
        var modeWidth = (zoomMode === 'width') ||
                        (Array.isArray(zoomMode) && zoomMode.includes('width'));
        // var modeHeight = (zoomMode === 'height') ||
        //                 (Array.isArray(zoomMode) && zoomMode.includes('height'));
        zoom.addEventListener('touchstart', (e) => {
            // 第一次点下去时的亮点距离
            var oldDis = getTwoPointDistance(e);
            var touchMove = function (e) {
                // 新的的两点距离
                var newDis = oldDis;
                if (e.targetTouches[1]) {
                   newDis = getTwoPointDistance(e);
                   if (modeWidth) {
                        var width = (newDis / oldDis * parseInt(zoom.style.width, 10));
                        if (width < minWidth) { 
                            width = minWidth;
                        } else if (width > maxWidth) {
                            width = maxWidth;
                        }
                        zoom.style.width = width + '%';
                   }
                   
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