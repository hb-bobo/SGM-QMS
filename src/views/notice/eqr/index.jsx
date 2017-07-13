import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import Circle from '@/components/circle';
import pathToJSON from '@/utils/object/pathToJSON';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

class Eqr extends React.Component {
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
                                            <span>{intl.get('QMS.IssueType')}: </span>
                                            <span> {item.source}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('HotLevel')}: </span>
                                            <span> {item.hotLevel}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.Champion')}: </span>
                                            <span> {item.pspnsUser}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('StockDay')}: </span>
                                            <span> {item.stockDay}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ECD')}: </span>
                                            <span> {item.planFinishDate}</span>
                                        </div>
                                        <div className="flex-col-5">
                                            <span>{intl.get('QMS.ACD')}: </span>
                                            <span> {item.planActualFinishDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-10">
                                            <span>{intl.get('QMS.WorkingPlan')}: </span>
                                            <span> {item.workPlans}</span>
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

export default Eqr