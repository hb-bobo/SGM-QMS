import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import HDate from '@/components/form/h-date';
import pathToJSON from '@/utils/object/pathToJSON';
import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

class HotIssueReviewPlan extends React.Component {
    static defaultProps = {
        dataSource: []
    }
    static propTypes = {
        dataSource: PropTypes.array,
        selectHis: PropTypes.func.isRequired
    }

    state = {
        hisDate: ''
    }
    
    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
        }
    }
    
    render () {
        intl.setMsg(require('@/static/i18n').default);
        var { dataSource, selectHis } = this.props;
        return (
            <div>
                <div className="item-top flex-row">
                    <div className="flex-col-1">
                        <label htmlFor="">{intl.get('QMS.HistorySearch')}:</label>
                    </div>
                    <div className="flex-col-2">
                        <HDate
                            type="date"
                            value={this.state.hisDate}
                            onChange={this.bind('hisDate')}
                        >
                        </HDate>
                    </div>
                    <div>
                        <span onClick={() => {selectHis(this.state.hisDate)}}>111</span>
                    </div>
                </div>
                <Scroller autoSetHeight={true} >
                    {dataSource.map((item, i) => {
                        return (
                            <div key={i} >
                                <SpaceRow height="0.4em"/>
                                <div className="item-top flex-row">
                                    <div className="flex-col-9">
                                        <span>{intl.get('QMS.IssueNo')}: </span>
                                        <span> {item.prblmNo}</span>
                                    </div>
                                    <div className="flex-col-1">
                                        <Circle value={item.currentStatus}></Circle>
                                    </div>
                                </div>
                                <div className="item-top flex-row">
                                    <div className="flex-col-10">
                                        <span>{intl.get('QMS.Description')}: </span>
                                        <span> {item.prblmDesc}</span>
                                    </div>
                                </div>
                                <div className="item-top flex-row">
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.ProgramName')}: </span>
                                        <span> {item.projectName}</span>
                                    </div>
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.ReviewLevel')}: </span>
                                        <span> {item.reviewLevel}</span>
                                    </div>
                                </div>
                                <div className="item-top flex-row">
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.SeverityLevel')}: </span>
                                        <span> {item.prblmSeverity}</span>
                                    </div>
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.Dept')}: </span>
                                        <span> {item.dept}</span>
                                    </div>
                                </div>
                                <div className="item-top flex-row">
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.Age')}: </span>
                                        <span> {item.stockDay}</span>
                                    </div>
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.CurrentStep')}: </span>
                                        <span> {item.crntPhase}</span>
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

export default HotIssueReviewPlan