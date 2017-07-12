import * as React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fillListData } from '@/store/actions';
import FlatButton from 'material-ui/FlatButton';

import Circle from '@/components/circle';
import SpaceRow from '@/components/space-row';
import intl from '@/components/intl';

@connect(
    // mapStateToProps
    (state) => ({listData: state.common.listData}),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            fillListData,
        }, dispatch)
    })
)
class WarningApprove extends React.Component {
    static defaultProps = {
        listData: []
    }
    static propTypes = {
        listData: PropTypes.array,
        goAdvance: PropTypes.func.isRequired,
        tabValue: PropTypes.number.isRequired
    }
    state = {
        listData: [],

    }
    componentWillMount () {
       this.setState({
            listData: this.$store.getState().common.listData
       });
    }
    
    componentDidMount () {
        
        var listData = [{prblmNo:"222",problemDesc:"222",state:"W",promotion:1,problemSevertiy:1,stockDay:11,projectName:"222",name:"222",crntPhase:"222"},
                        {prblmNo:"111",problemDesc:"111",state:"G",promotion:2,problemSevertiy:2,stockDay:22,projectName:"111",name:"111",crntPhase:"111"}]
        this.setState({
            title: intl.get('Detail'),
            listData: listData
        });
    }
    // Go to Advance page
    goAdvance = (advanceType) => {
        this.props.goAdvance('/search/issue-advance/' + advanceType);
    }
    // Approved the hot review item
    approve (id) {
        return () => {
            console.log(id, '批准')
        }
    }
    // Reject the hot review item
    reject (id) {
        return () => {
            console.log(id, '驳回')
        }
    }
    render () {
        var { listData, tabValue } = this.state;
        intl.setMsg([require('@/static/i18n').default,require('./locale')]);

        return (
            <div className="gtasks-list">
                {
                    listData.map((item, i) => {
                        return (
                            <div className="item" key={i}>
                                <div className="flex-row item-top">
                                    <div className="flex-col-9">
                                        <div>
                                            <span 
                                                style={{color: 'rgb(106, 196, 246)', marginBottom: '4px'}}
                                                onClick={() => this.goAdvance('PRTS')}
                                            >
                                               {item.prblmNo}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="left">
                                            {intl.get('QMS.WorkingPlanDescription')}:
                                            </span>
                                            <span className="right">
                                                {item.problemDesc}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-col-1">
                                        <Circle value={item.state}/>
                                    </div>
                                </div>
                                <div className="item-body">
                                    <div className="flex-row">
                                        <div className="flex-col-1">
                                            <div>
                                                <span>{intl.get('ApplyLevel')}: </span>
                                                <span className="right">{item.promotion}</span>
                                            </div>
                                        </div>
                                        <div className="flex-col-1">
                                            <div className="review-time">
                                                <span>{intl.get('ApplyUser')}: </span>
                                                <span>{item.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-row">
                                        <div className="flex-col-1">
                                            <div>
                                                <span>{intl.get('QMS.ProgramName')}: </span>
                                                <span className="right">{item.projectName}</span>
                                            </div>
                                        </div>
                                        <div className="flex-col-1">
                                            <div>
                                                <span>{intl.get('QMS.CurrentStep')}: </span>
                                                <span className="right">{item.crntPhase}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-row">
                                        <div className="flex-col-1">
                                            <div>
                                                <span>{intl.get('IssueLevel')}: </span>
                                                <span className="right">{item.problemSevertiy}</span>
                                            </div>
                                        </div>
                                        <div className="flex-col-1">
                                            <div>
                                                <span>{intl.get('QMS.Age')}: </span>
                                                <span className="right">{item.stockDay}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-row btn">
                                    <div className="flex-col-1">
                                        <FlatButton 
                                            label={intl.get('QMS.Approve')}
                                            fullWidth={true}
                                            labelStyle={{paddingLeft:'0'}}
                                            onClick={this.approve(1321312)}
                                        >
                                            <svg className="icon" aria-hidden="true">
                                                <use xlinkHref="#icon-pass"></use>
                                            </svg>
                                        </FlatButton>
                                        
                                    </div>
                                    <SpaceRow height={30} width="1px"/>
                                    <div className="flex-col-1">
                                        <FlatButton 
                                            label={intl.get('QMS.Reject')}
                                            fullWidth={true}
                                            labelStyle={{paddingLeft:'0'}}
                                            onClick={this.reject(123123)}
                                        >
                                            <svg className="icon" aria-hidden="true">
                                                <use xlinkHref="#icon-reject"></use>
                                            </svg>
                                        </FlatButton>
                                    </div>
                                </div>
                                <SpaceRow height={6} width="100%"/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
 
export default WarningApprove;