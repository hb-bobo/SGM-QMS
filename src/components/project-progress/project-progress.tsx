import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getTime } from '@/utils/format/';
import './index.css';

interface Config {
    projectPhase: string
}
interface ProjectSchedules {
    subProjectID: string;
    projectPhase: string;
    openStatus: string;
    regateTime: any;
}
class ProjectProgress extends React.Component<{[key: string]: any}, any> {
    static propTypes = {
        projectSchedules: PropTypes.array,
        width: PropTypes.number
    }
    static defaultProps = {
        configs: [
            {projectPhase: 'PPV'},
            {projectPhase: 'MVBns'},
            {projectPhase: 'MVBs'},
            {projectPhase: 'SORP'},
            {projectPhase: 'STC'}
        ],
        projectSchedules: []
    }
    static contextTypes = {
        language: PropTypes.string
    }
    state = {
        maxWidth: 0
    }

    private container: Element; // p-progresss容器

    componentDidMount () {
        var container = this.container as Element;
        var width: number = this.props.width;
        if (!this.props.width) {
            width = container.clientWidth;
        }
        this.setArrowWidth(width);
        window.addEventListener('resize', () => {
            this.setArrowWidth(container.clientWidth);
        })
    }
    /**
     * set arrow width
     * @param {number}
     * @return {void}
     */
    setArrowWidth (width: number) {
        this.setState({
            maxWidth: width - 20
        });
    }
    /**
     * 动态创建箭头的路径
     * @param {number} x轴
     * @param {number} y轴
     * @return {string} path
     */
    arrowsPath (x: number = 0, y: number = 0) {
        var originalPath: Array<Array<number>> = [
            [0, 10],
            [0, 6],
            [14, 10],
            [0, 14],
            [0, 10]
        ]
        var newPath: string = originalPath.map(function (coordinate: number[]) {
            return  String(coordinate[0] + x) + ',' + String(coordinate[1] + y);
        }).join(' ');
        return newPath;
    }
    render () {
        
        var configs: Config[] = this.props.configs;
        var projectSchedules: any[] = this.props.projectSchedules; // 传入的数据
        var dateFormat: string = this.context.language === 'zh' ? 'yyyy/MM/dd' : 'MM/dd/yyyy';
        return (
            <div ref={(container: any) => {this.container = container}} className="p-progress flex-row">
                <svg className="p-line">
                    <line x1="0" y1="10" x2={this.state.maxWidth} y2="10" style={{stroke: '#FF9000', strokeWidth: 3}} />
                    <polygon 
                        points={this.arrowsPath(this.state.maxWidth)}
                        style={{fill: '#FF9000', stroke: '#FF9000', strokeWidth: 2}} 
                    />
                </svg>
                {/*空的, 为了布局好看*/}
                <div className="p-step flex-col-1 text-center"/>
                {   // 遍历5个盾
                    configs.map(function (item: Config, i: number) {
                        var currentPhase: ProjectSchedules = projectSchedules[i] || {};
                        // Y 蓝色 N 灰色
                        var currentPhaseColor: string = currentPhase.openStatus === 'Y' ? '#1910C6' : '#BFBFBF';
                        return (
                            <div key={i} className="p-step flex-col-3 text-center">
                                <div className="p-time">
                                    <span>
                                        {
                                            currentPhase.regateTime && 
                                            getTime(currentPhase.regateTime.time, dateFormat)
                                        }
                                    </span>
                                </div>
                                <div className="p-content">
                                    <svg className="icon" style={{color: currentPhaseColor}} aria-hidden="true">
                                        <use xlinkHref="#icon-comiis_dunpai"/>
                                    </svg>
                                    <div className="p-text">
                                        <span>{item.projectPhase}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {/*空的, 为了布局好看*/}
                <div className="p-step flex-col-2 text-center">&nbsp;&nbsp;</div>
            </div>
        )
    }
}

export default ProjectProgress