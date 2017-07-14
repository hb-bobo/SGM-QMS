import * as React from 'react';
import PropTypes from 'prop-types';

import Scroller from '@/components/scroller';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

/*协助诊断 详情列表*/
class AssistDetails extends React.Component {
    static defaultProps = {
        dataSource: []
    }
    static propTypes = {
        dataSource: PropTypes.array
    }
    
    render () {
        intl.setMsg(require('@/static/i18n').default);
        var { dataSource } = this.props;
        return (
            <div>
                <Scroller autoSetHeight={true} >
                    {dataSource.map((item, i) => {
                        return (
                            <div key={i} >
                                <SpaceRow height="0.4em"/>
                                <div className="item-top flex-row">
                                    <div className="flex-col-10">
                                        <span>{intl.get('QMS.IssueNo')}: </span>
                                        <span style={{marginLeft: '5px', color: '#6AC4F6'}}> {item.sourcePrblmNo}</span>
                                    </div>
                                </div>
                                <div className="item-top flex-row">
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.Description')}: </span>
                                        <span> {item.prblmDesc}</span>
                                    </div>
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.ProgramName')}: </span>
                                        <span> {item.prjctName}</span>
                                    </div>
                                </div>
                                <div className="item-top flex-row">
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.SeverityLevel')}: </span>
                                        <span> {item.prblmSeverity}</span>
                                    </div>
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.CurrentStep')}: </span>
                                        <span> {item.crntPhase}</span>
                                    </div>
                                </div>
                                <div className="item-top flex-row">
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.Dept')}: </span>
                                        <span> {item.crntRspnsDept}</span>
                                    </div>
                                    <div className="flex-col-5">
                                        <span>{intl.get('QMS.Champion')}: </span>
                                        <span> {item.crntRspnsUser}</span>
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

export default AssistDetails