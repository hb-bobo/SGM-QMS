import * as React from 'react';
import PropTypes from 'prop-types';
// import store from '@/store';

import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';
import HSelect from '@/components/form/h-select';
import HTextarea from '@/components/form/h-textarea';
import intl from '@/components/intl';
/*
    s
*/

export class HotUp extends React.Component {
    static defaultProps = {
        data: {}
    }
    static propTypes = {
        data: PropTypes.object,
        parent: PropTypes.instanceOf(React.Component).isRequired
    }
    
    state = {
        planDesc: '',
        planFinishDate: '',
        prblmId: '',
        prblmPhaseID: '',
        rspnsUser: '',
        workPlanID: '',
        workPlanStatus: ''
    }
    componentWillMount () {
        this.parent = this.props.parent;
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.action === 'add') {
            this.setState({
                planDesc: '',
                planFinishDate: '',
                prblmId: '',
                prblmPhaseID: '',
                rspnsUser: '',
                workPlanID: '',
                workPlanStatus: ''
            });
            return;
        }
        this.setState(nextProps.data);
    }
    submit = () => {
        /*this.parent.props.actions.upWorkPlanListData({
            action: this.props.action,
            value: this.state
        });*/
        this.parentStateChange();
    }
    cancel = () => {
        this.parentStateChange();
    }
    // 改变父级的状态
    parentStateChange () {
        this.parent.setState({
            hotUpOpen: false,
            isIndex: true
        });
    }
    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
        }
    }
    render() {
        // var { data } = this.props;Reason
        var options = ['aa', 'xxxx', 'xvv']
        intl.setMsg(require('@/static/i18n').default, require('./locale'))
        return (
            <div className="hot-up-form">
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="planDesc" className="justify">{intl.get('AppoveSeverity')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HSelect
                            defaultValue={'aa'}
                            options={options}
                            onChange={this.bind('planDesc')}
                        >
                        </HSelect>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="prblmPhaseID" className="justify">{intl.get('QMS.Approver')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HSelect
                            value={this.state.planDesc}
                            onChange={this.bind('planDesc')}
                        >
                        </HSelect>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="rspnsUser" className="justify">{intl.get('QMS.Action')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HSelect
                            value={this.state.planDesc}
                            onChange={this.bind('planDesc')}
                        >
                        </HSelect>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.Reason')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HTextarea
                            clear
                            value={this.state.planDesc}
                            onChange={this.bind('planDesc')}
                        >
                        </HTextarea>
                    </div>
                </div>
                <div className="flex-row btn">
                    <div className="flex-col-1 text-center">
                        <RaisedButton fullWidth={true} onClick={this.submit}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-submit"></use>
                            </svg>
                            {intl.get('QMS.Submit')}
                        </RaisedButton>
                    </div>
                    <div className="flex-col-1 text-center">
                        <RaisedButton fullWidth={true} onClick={this.cancel}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-cancel"></use>
                            </svg>
                            {intl.get('QMS.Cancel')}
                        </RaisedButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotUp
