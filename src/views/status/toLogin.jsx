import * as React from 'react';
import PropTypes from 'prop-types';
import { POST } from '@/plugins/fetch';
import { Toast } from 'antd-mobile';
/**
 * 切换账户用
 */
class ToLogin extends React.Component{
  static contextTypes = {
    router: PropTypes.object,
  }

  componentWillMount () {

  }

  goToHome = () => {
    POST('/monthReport/getUserId', {
          data:{
            doMainAcct: this.input.value,
          }
      })
      .then((res) => {
          if (res.success) {
            return res.hrmEmpInfo;
          } else {
            Toast.info('获取ID失败');
          }
      }).then((hrmEmpInfo) => {

          if (!hrmEmpInfo.EMP_ID) {
            alert('empId无效');
          }
          // 设置必要字段到sessionStorage，sessionStorage更方便使用
          sessionStorage.setItem('positNum', hrmEmpInfo.POSIT_NUM);
          sessionStorage.setItem('empId', hrmEmpInfo.EMP_ID);
          this.context.router.history.push('/');
      });
    // TODO　120485 
    // var positNum = 'A4010338';
    // var empId = "111160"; // 120485
    // sessionStorage.setItem('positNum', positNum);
    // sessionStorage.setItem('empId', empId);
    // this.context.router.history.push('/');
  }
  render() {
    return (
      <div className="text-center">
        <input style={{marginTop: '20px'}} type="text" defaultValue="s5n2mc" ref={ref => this.input = ref}/>
        <button style={{display: 'blick', marginTop: '10px', width: '100%'}} onClick={this.goToHome}>登录</button>
      </div>
    );
  }
}

export default ToLogin;
