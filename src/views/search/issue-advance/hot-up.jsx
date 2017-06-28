import * as React from 'react';
import PropTypes from 'prop-types';
// import store from '@/store';

// import SelectField from 'material-ui/SelectField';

import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';

/*
    s
*/

export class HotUp extends React.Component {
    static defaultProps = {
        data: {}
    }
    static propTypes = {
        data: PropTypes.object
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
    componentDidMount () {
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
        
        // this.parent.setState({open: false});
    }
    save = () => {
        this.parent.props.actions.upWorkPlanListData({
            action: this.props.action,
            value: this.state
        });
        this.parentStateChange();
    }
    cancel = () => {
        this.parentStateChange();
    }
    parentStateChange () {
        this.parent.setState({
            hotUpOpen: false
        });
        this.parent.setState({
            isIndex: true
        });
    }
    bind = (key) => {
        return (e) => {
            this.setState(pathToJSON(key, e.target.value));
            /*store.dispatch(upWorkPlanEditData({
                action: 'change',
                key: key,
                value: e.target.value
            }));*/
        }
    }

    selectBind = (key) => {
        return (event, index, value) => {
            this.setState(pathToJSON(key, value));
            /*store.dispatch(upWorkPlanEditData({
                action: 'change',
                key: key,
                value: value
            }));*/
        }
    }
    render() {
        // var { data } = this.props;
        return (
            <div className="hot-up-form">
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="planDesc">评审等级:</label>
                    </div>
                    <div className="flex-col-7">
                        <select name="" id="">
                            <option value=""></option>
                            <option value="1">aaa</option>
                        </select>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="prblmPhaseID">审批人:</label>
                    </div>
                    <div className="flex-col-7">
                        <select name="" id="">
                            <option value=""></option>
                            <option value="1">aaa</option>
                        </select>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="rspnsUser">操作:</label>
                    </div>
                    <div className="flex-col-7">
                        <select name="" id="">
                            <option value=""></option>
                            <option value="1">aaa</option>
                        </select>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="">状态:</label>
                    </div>
                    <div className="flex-col-7">
                        <textarea name="" id="" cols="30" rows="10">

                        </textarea>
                    </div>
                </div>
                <div className="flex-row btn">
                    <div className="flex-col-1 text-center">
                        <RaisedButton fullWidth={true} onClick={this.save}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-submit"></use>
                            </svg>
                            提交
                        </RaisedButton>
                    </div>
                    <div className="flex-col-1 text-center">
                        <RaisedButton fullWidth={true} onClick={this.cancel}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-cancel"></use>
                            </svg>
                            取消
                        </RaisedButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotUp
