import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import Circle from '@/components/circle';
import pathToJSON from '@/utils/object/pathToJSON';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

class Warning extends React.Component {
    static defaultProps = {
        dataSource: []
    }
    static propTypes = {
        dataSource: PropTypes.array,
        selectHis: PropTypes.func.isRequired
    }
    
    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
        }
    }
    
    render () {
        intl.setMsg([require('@/static/i18n').default,require('./locale')]);
        var { dataSource, goAdvance } = this.props;
        return (
            <div>
                <Scroller autoSetHeight={true} >
                    {dataSource.map((item, i) => {
                        return (
                            <div key={i} className="item">
                                <SpaceRow height="0.4em"/>
                                <div className="flex-row item-top">
                                    <div className="flex-col-9" onClick={() => {goAdvance('EIR')}}>
                                        <span>{intl.get('QMS.IssueNo')}: </span>
                                        <span> {item.prblmNo}</span>
                                    </div>
                                    <div className="flex-col-1">
                                        <Circle value={item.state}></Circle>
                                    </div>
                                </div>
                                <div className="item-body">
                                    <div className="flex-row">
                                        <div className="flex-col-10">
                                            <span>{intl.get('QMS.Description')}: </span>
                                            <span> {item.problemDesc}</span>
                                        </div>
                                    </div>
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