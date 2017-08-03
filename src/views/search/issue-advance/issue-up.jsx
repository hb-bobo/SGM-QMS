import * as React from 'react';
import PropTypes from 'prop-types';
// import store from '@/store';
import { Toast } from 'antd-mobile';
import RaisedButton from 'material-ui/RaisedButton';
import pathToJSON from '@/utils/object/pathToJSON';
import HSelect from '@/components/form/h-select';
import HTextarea from '@/components/form/h-textarea';
import intl from '@/components/intl';
import { POST } from '@/plugins/fetch';
import array2Array from '@/utils/array/array2Array';
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
        directors: [],
        seniorMgrs: [],
        majors: [],
        targetLevel: '',
        prblmUpgradeOp: '',
        upgradeReason: '',
        directorID: '',
        seniorMgrID: '',
        majorID: ''
    }
    componentWillMount () {
        this.parent = this.props.parent;
        POST('/mproblem/findByPosit', {
        data: {
            id: this.parent.state.issueData.prblmId
        }
        }).then((res) => {
            if (res.success === true) {
                var directors = [];
                var seniorMgrs = [];
                var majors = [];
                // console.log(array2Array({data: res.result,format: ["text","value"],originaFormat:["NAME","EMP_ID"]}))
                if(res.result || res.result.zj){
                    directors = array2Array({data: res.result.zj,format: ["text","value"],originaFormat:["NAME","EMP_ID"]});
                }
                if(res.result || res.result.jl){
                    seniorMgrs = array2Array({data: res.result.jl,format: ["text","value"],originaFormat:["NAME","EMP_ID"]});
                }
                if(res.result || res.result.zg){
                    majors = array2Array({data: res.result.zg,format: ["text","value"],originaFormat:["NAME","EMP_ID"]});
                }
                this.setState({
                    directors: directors,
                    seniorMgrs: seniorMgrs,
                    majors: majors
                });
            }
        })
    }
    submit = () => {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        POST('/mproblem/createUpgradeLog', {
            headers: headers,
            data: {
                prblmId: this.parent.state.issueData.prblmId,
                targetLevel: this.state.targetLevel,
                prblmUpgradeOp: this.state.prblmUpgradeOp,
                upgradeReason: this.state.upgradeReason,
                directorID: this.state.directorID,
                seniorMgrID: this.state.seniorMgrID,
                majorID: this.state.majorID
            }
        }).then((res) => {
            if (res.success === true) {
                this.parentStateChange();
                Toast.info('操作成功');
            }else{
                Toast.info('操作失败');
            }
        })
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
        return (
            <div className="hot-up-form">
                <div className="edit-item flex-row">
                    <div className="flex-col-3" style={{alignSelf: 'flex-start'}}>
                        <label htmlFor="planDesc" className="justify">{intl.get('QMS.Level')} :</label>
                    </div>
                    <div className="flex-col-7">
                        <label><input name="lv" type="radio" value="3" onChange={this.bind('targetLevel')}/>{intl.get('QMS.Director')} </label>
                        <HSelect
                            value={this.state.directorID}
                            options={this.state.directors}
                            onChange={this.bind('directorID')}
                        >
                        </HSelect>
                        <label><input name="lv" type="radio" value="2" onChange={this.bind('targetLevel')}/>{intl.get('QMS.SrMgr')} </label>
                        <HSelect
                            value={this.state.seniorMgrID}
                            options={this.state.seniorMgrs}
                            onChange={this.bind('seniorMgrID')}
                        >
                        </HSelect>
                        <label><input name="lv" type="radio" value="1" onChange={this.bind('targetLevel')}/>{intl.get('QMS.EGM')} </label>
                        <HSelect
                            value={this.state.majorID}
                            options={this.state.majors}
                            onChange={this.bind('majorID')}
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
                            value={this.state.prblmUpgradeOp}
                            options={[{text:"申请",value:"C"}]}
                            onChange={this.bind('prblmUpgradeOp')}
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

export default IssueUP
