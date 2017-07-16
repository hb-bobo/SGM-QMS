import * as React from 'react';
import PropTypes from 'prop-types';
// import store from '@/store';

import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';
import HSelect from '@/components/form/h-select';
import HTextarea from '@/components/form/h-textarea';
import HInput from '@/components/form/h-input';
import intl from '@/components/intl';
/*
    s
*/

export class IssueUP extends React.Component {
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
            issueUPOpen: false,
            isIndex: true
        });
    }
    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
        }
    }
    render() {
        intl.setMsg(require('@/static/i18n').default)
        // var { data } = this.props;
        var options = ['aa', 'xxxx', 'xvv']
        return (
            <div className="hot-up-form">
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="planDesc" className="justify">{intl.get('QMS.Level')} :</label>
                    </div>
                    <div className="flex-col-7">
                        <label><input name="lv" type="radio" value="" />{intl.get('QMS.Director')} </label>
                        <HInput
                            clear
                            type="text"
                            defaultValue={'aa'}
                            options={options}
                            onChange={this.bind('planDesc')}
                        />
                        <label><input name="lv" type="radio" value="" />{intl.get('QMS.SrMgr')} </label>
                        <HInput
                            clear
                            type="text"
                            defaultValue={'aa'}
                            options={options}
                            onChange={this.bind('planDesc')}
                        />
                        <label><input name="lv" type="radio" value="" />{intl.get('QMS.EGM')} </label>
                        <HInput
                            clear
                            type="text"
                            defaultValue={'aa'}
                            options={options}
                            onChange={this.bind('planDesc')}
                        />
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="rspnsUser" className="justify">操  作:</label>
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

export default IssueUP
