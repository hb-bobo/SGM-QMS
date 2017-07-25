import * as React from 'react';
import PropTypes from 'prop-types';
// import store from '@/store';

import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';
import HSelect from '@/components/form/h-select';
import HDate from '@/components/form/h-date';
import HTextarea from '@/components/form/h-textarea';
import intl from '@/components/intl';
import { POST } from '@/plugins/fetch';
import array2Array from '@/utils/array/array2Array';
/*
    s
*/

export class HotUp extends React.Component {
    static defaultProps = {
    }
    static propTypes = {
        parent: PropTypes.instanceOf(React.Component).isRequired
    }
    
    state = {
        apprs:[],
        aprvr: '',
        reviewTime: '',
        upgradeReason: '',
        prblmReviewOp: '',
        hotLevel: ''
    }
    componentWillMount () {
        this.parent = this.props.parent;
        POST('/mproblem/findAprvr', {
        data: {}
        }).then((res) => {
            if (res.success === true) {
                var apprs = [];
                // console.log(array2Array({data: res.result,format: ["text","value"],originaFormat:["NAME","EMP_ID"]}))
                if(res.result){
                    apprs = array2Array({data: res.result,format: ["text","value"],originaFormat:["NAME","EMP_ID"]});
                }
                // console.log(res.result,apprs)
                this.setState({
                    apprs : apprs
                });
            }
        })
    }
    submit = () => {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        POST('/mproblem/createReviewLog', {
        headers: headers,
        data: {
            prblmId: this.parent.state.issueData.prblmId,
            aprvr: this.state.aprvr,
            reviewTime: this.state.reviewTime,
            upgradeReason: this.state.upgradeReason,
            prblmReviewOp: this.state.prblmReviewOp,
            hotLevel: this.state.hotLevel
        }
        }).then((res) => {
            if (res.success === true) {
                this.parentStateChange();
            }else{
                alert("操作失败");
            }
        })
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
        var options = [];
        if(this.parent.state.advType === 'QDCPIR'){
            options = [{text:"售后EQR专题",value:4}]
        }else{
            options = [{text:"EQR专题",value:1},{text:"EQR常规",value:2},{text:"项目热点",value:3}]
        }
        intl.setMsg(require('@/static/i18n').default, require('./locale'))
        return (
            <div className="hot-up-form">
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="planDesc" className="justify">{intl.get('AppoveSeverity')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HSelect
                            value={this.state.hotLevel}
                            options={options}
                            onChange={this.bind('hotLevel')}
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
                            value={this.state.aprvr}
                            options={this.state.apprs}
                            onChange={this.bind('aprvr')}
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
                            value={this.state.prblmReviewOp}
                            options={[{text:"申请",value:"C"}]}
                            onChange={this.bind('prblmReviewOp')}
                        >
                        </HSelect>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3">
                        <label htmlFor="">{intl.get('QMS.ReportDate')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HDate
                            clear
                            type="date"
                            value={this.state.reviewTime}
                            onChange={this.bind('reviewTime')}
                        >
                        </HDate>
                    </div>
                </div>
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="" className="justify">{intl.get('QMS.Reason')}:</label>
                    </div>
                    <div className="flex-col-7">
                        <HTextarea
                            clear
                            value={this.state.upgradeReason}
                            onChange={this.bind('upgradeReason')}
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
