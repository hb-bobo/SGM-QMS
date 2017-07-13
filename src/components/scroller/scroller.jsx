import * as React from 'react';
import PropTypes from 'prop-types';
import './scroller.css';
import { getRemainingHeight } from '@/utils/dom';
import { throttle } from '@/utils/tools';
import AlloyTouch from 'alloytouch';
import Transform from './transform.js';

/**
 * scroll容器
 */
class Scroller extends React.Component {
    static defaultProps = {
        containerHeight: 100,
        autoSetHeight: false,
        bottomHeight: 0, // 底部高。May have a menu at the bottom,
        scrollTop: 0,
        bounce: true,
        config: {
            downContent: 'Loading More'
        },
        donePulldown: 'done'
    }
    static propTypes = {
        containerHeight: PropTypes.number,
        autoSetHeight: PropTypes.bool,
        bottomHeight: PropTypes.number,
        config: PropTypes.object,
        onScrollBottom: PropTypes.func,
        onPullupLoading: PropTypes.func,
    }
    state = {
        first: true,
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
        // 记录scrollTop 位置
        if (this.refs.scrollerContainer) {
            this.refs.scrollerContainer.addEventListener('scroll', throttle(() => {
                if (this.refs.scrollerContainer !== undefined) {
                    this.setState({
                        scrollTop: this.refs.scroller.scrollTop
                    });
                }
            }, 500));
        }

    }
    componentDidUpdate () {
        if (!this.state.first || !this.props.bounce) {
            return false;
        }
        if (this.state.first) {
            this.setState({
                first: false
            });
        }
        var {
            scroller,
            scrollerContainer
        } = this.refs; // 当前组件
        var {
            onScrollBottom,
            
        } = this.props; // 当前组件

        var { containerHeight } = this.state;
        var min = 0;
        var max = 20;
        var _this = this; 
        Transform(scroller, true);
        var at = new AlloyTouch({
            touch: scrollerContainer,//反馈触摸的dom
            vertical: true,//不必需，默认是true代表监听竖直方向touch
            target: scroller, //运动的对象
            property: "translateY",  //被运动的属性
            min: min, //不必需,运动属性的最小值
            max: max, //不必需,滚动属性的最大值
            // sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
            // factor: 1,//不必需,表示触摸位移与被运动属性映射关系，默认值是1
            // step: 45,//用于校正到step的整数倍
            // bindSelf: false,
            initialValue: 0,
            change: function (value) {
            }, 
            touchStart: function (ev, value) {
                // 每次点击都重新计算scroll高度
                min = (containerHeight - scroller.clientHeight) - 10;
                if (min > max) {
                    min = max;
                }
                this.min = min;
            },
            touchMove: function (ev, value) {
                // 上拉到底了
                if (value < (this.min - 60)) {
                    _this.onScrollBottom();
                }
                
            },
            touchEnd: function (ev, value) {
                // 下拉最大值了，并松开了
                if (value > 30) {
                    this.to(30);
                    return false;
                }

                // 到底了，并松开了
                if (value < this.min) {
                    _this.onPullupLoading();
                }
                
            },
            tap: function (ev, value) {
            },
            pressMove: function (ev, value) {
            },
            animationEnd: function (value) {
            } //运动结束
        });
        this.setState({
            at: at
        });
    }
    /*scroller到底部剩余的高度*/
    setHeight (alloyTouch) {
        var remainingHeight = getRemainingHeight(this.refs.scroller); // 计算剩余高
        var containerHeight = remainingHeight - this.props.bottomHeight; // 容器实际剩余高
        this.setState({
            containerHeight: containerHeight
        });
    }
    /*到底部了， 会执行多次*/
    onScrollBottom = () => {
        /*this.setState({
            bottomText: this.props.config.noMore
        });*/
        this.props.onScrollBottom && this.props.onScrollBottom();
    }
    /*上拉加载*/
    onPullupLoading = () => {
        this.props.onPullupLoading && this.props.onPullupLoading();
    }
    /*下拉加载*/
    onPulldownLoading = () => {
        this.props.onPulldownLoading && this.props.onPulldownLoading();
    }
    /*下拉加载完成*/
    pulldownDone = () => {
        this.pulldownDone
    }
    render () {
        var children = this.props.children;
        var containerHeight = this.state.containerHeight;
        var config = this.props.config;
        return (
            <div>
                {/*<div ref="pull_refresh" style={{height: "100px", backgroundColor: '#000'}}>
                    以后开发下拉刷新
                </div>*/}
                <div ref="scrollerContainer" className="scroller-container" style={{height: parseInt(containerHeight, 10) + 'px'}}>
                    <div ref="scroller" className="scroller">
                        {
                            children && React.Children.toArray(children).map((child) => child)
                        }
                        <div className="bottom-loading text-center">
                            <span>{config.downContent}</span>
                        </div>
                        {
                            this.props.loadingMore ? 
                                <div className="loading-more text-center" onClick={this.loadingMore}>
                                    <span>{config.downContent}</span>
                                </div> :
                                null
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Scroller