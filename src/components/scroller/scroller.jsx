import * as React from 'react';
import PropTypes from 'prop-types';
import './scroller.css';
import { getRemainingHeight } from '@/utils/dom';
/**
 * scroll容器
 */
class Scroller extends React.Component {
    static defaultProps = {
        containerHeight: 100,
        autoSetHeight: false,
        bottomHeight: 0 // 底部高。May have a menu at the bottom
    }
    static propTypes = {
        containerHeight: PropTypes.number,
        autoSetHeight: PropTypes.bool,
        bottomHeight: PropTypes.number
    }
    componentWillMount () {
        // 初始化containerHeight
        this.setState({
            containerHeight: this.props.containerHeight
        });
    }
    componentDidMount () {
        if (this.props.autoSetHeight) {
            this.setHeight();
        }
    }
    /*scroller到底部剩余的高度*/
    setHeight () {
        var remainingHeight = getRemainingHeight(this.refs.scroller);
        this.setState({
            containerHeight: remainingHeight - this.props.bottomHeight
        });
    }

    render () {
        var children = this.props.children || [];
        var containerHeight = this.state.containerHeight;
        return (
            <div ref="scroller" className="scroller-container" style={{height: parseInt(containerHeight, 10) + 'px'}}>
                <div className="scroller">
                    {
                        children.map((child) => child)
                    }
                </div>
            </div>
        )
    }
}

export default Scroller