import * as React from 'react';
import PropTypes from 'prop-types';

import mixins from '@/decorator/mixins';
import {componentWillMount, componentWillUnmount, getListData, loadingMore} from '@/mixins/';
import Scroller from '@/components/scroller';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';
// import { POST } from '@/plugins/fetch';
// import AppConfig from '@/AppConfig';


//TODO 上升级别
/*  
    0: 工程师
    1： EGM
    2： 高级经理
    3： 总监
*/
@mixins(componentWillMount, componentWillUnmount, getListData, loadingMore)
class Warning extends React.Component {
    static defaultProps = {
        getListDataAPI: '/notice/mPromptNotice'
    }
    static propTypes = {
        getListDataAPI: PropTypes.string.isRequired,
        goAdvance: PropTypes.func.isRequired
    }
    state = {
    }
    componentDidMount () {
        this.getListData('down');
    }
    render () {
        intl.setMsg(require('@/static/i18n').default, require('./locale'));
        var { goAdvance } = this.props;
        var { listData } = this.state;
        return (
            <div>
                <Scroller 
                    autoSetHeight={true}
                    onPullupLoading={() => this.loadingMore()}
                    onPulldownLoading={() => this.getListData('down')}
                    config={this.state.scrollConfig}
                    ref="scroller"
                >
                    {listData.map((item, i) => {
                        return (
                            <div key={i} className="item">
                                <SpaceRow height="0.4em"/>
                                <div className="flex-row item-top">
                                    <div className="flex-col-9" onClick={() => {goAdvance(item.source, item.problemId)}}>
                                        <div>
                                            <span className="issueNo"> {item.prblmNo}</span>
                                        </div>
                                        <div style={{marginTop: '0.6em'}}>
                                            <span>{item.problemDesc}</span>
                                        </div>
                                    </div>
                                    <div className="flex-col-1">
                                        <Circle value={item.state}></Circle>
                                    </div>
                                </div>
                                <div className="item-body">
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ProgramName')}: </span>
                                            <span> {item.projectName}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Dept')}: </span>
                                            <span> {item.pspnsDept}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.SeverityLevel')}: </span>
                                            <span> {item.problemSevertiy}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.CurrentStep')}: </span>
                                            <span> {item.crntPhase}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Age')}: </span>
                                            <span> {item.stockDay}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('ApplyLevel')}: </span>
                                            <span> {item.promotion}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('ApplyUser')}: </span>
                                            <span> {item.name}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ApprovalStatus')}: </span>
                                            <span> {item.reviewOp}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Scroller>
            </div>
        )
    }
}

export default Warning