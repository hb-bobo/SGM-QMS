import * as React from 'react';
import PropTypes from 'prop-types';
import AppRouter from './router';
import store from './store';
import {updateMenuAuthority, updateHandleAuthority} from '@/store/actions';
import { POST } from '@/plugins/fetch';

// 各种Provider
import { Provider } from 'react-redux';

// import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {addLocaleData} from 'react-intl';
// import zh from 'react-intl/locale-data/zh';
// import en from 'react-intl/locale-data/en';
import AppConfig from './AppConfig';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Toast } from 'antd-mobile';
import intl from './components/intl';

//样式
import './static/css/base.css';
import './static/css/app.css';
import './static/css/common.css';
import './static/css/cover.less';
// iconfont 如果有大量waring 在第一行加上  // eslint-disable-next-line 
import './static/fonts/iconfont.js';

/*material-ui 主题设置*/
const muiTheme = getMuiTheme({
  appBar: {
    height: 48
  },
  palette: {
    primary1Color: '#ED1B24',
  },
  tabs: {
    backgroundColor: "#FFFFFF",
    selectedTextColor: "#ED1B24",
    textColor: "#000"
  }
});
// 设置语言
intl.setLanguage(AppConfig.language);
// 设置公共语言包
import(/* webpackChunkName: "intl" */ '@/static/i18n')
.then((res) => {
  intl.setMsg(res.default);
});

// use $store every where
React.Component.prototype.$store = store;

class App extends React.Component{
  static childContextTypes = {
    language: PropTypes.string,
    setLanguage: PropTypes.func,
    plugins: PropTypes.object,
  }
  state = {
    language: AppConfig.language
  }
  // 设置了所有子组件才拿到ｃｏｎｔｅｘｔ
  getChildContext() {
    return {
      language: this.state.language,
      setLanguage: (language) => {
        this.setState({language: language});
        intl.setLanguage(language);
      }
    };
  }

  componentWillMount () {
    // 先清一遍
    sessionStorage.removeItem('empId');
    sessionStorage.removeItem('positNum');
    sessionStorage.removeItem('userName');

    if (sessionStorage.getItem('userName') === null) {
      this.getUserName();
    }
  }
  componentDidMount () {
    
  }

  componentWillUnmount () {
    sessionStorage.removeItem('empId');
    sessionStorage.removeItem('positNum');
  }
  
  /**
   * get iwork username
   */
  getUserName () {
    // iwork提供的方法
    document.addEventListener('plusready', () => {
      var fhname = window.NativeObj.getUserName();
      if (!fhname) {
        Toast.info('获取用户名失败');
      }
      if (
        fhname === null ||
        fhname === undefined ||
        fhname === '') {
        window.location.hash = "403";
      } else {
        // 拿到userName再拿id
        sessionStorage.setItem('userName', fhname);
        this.getIdByUserName();
      }
    }, false);
    // TODO
    var userName = 'apptest01';
    sessionStorage.setItem('userName', userName);
    this.getIdByUserName();
  }

  /**
   * get empId by userName
   */
  getIdByUserName () {
      POST('/monthReport/getUserId', {
          data:{
            doMainAcct: sessionStorage.getItem('userName'),
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
          // 拿权限
          this.getAccess();
          // 设置必要字段到cookie, 暂时没用，可能未来要用
          // document.cookie = `positNum=${positNum};`;
          // document.cookie = `empId=${empId};`;
          // document.cookie = `userName=${userName};`;
      });

      // TODO　120485 
      // var positNum = 'A4010338';
      // var empId = "111160"; // 120485
      // // 设置必要字段到sessionStorage，sessionStorage更方便使用
      // sessionStorage.setItem('positNum', positNum);
      // sessionStorage.setItem('empId', empId);
      // // 拿权限
      // this.getAccess();
  }

  /**
   * 获取权限信息
   */
  getAccess () {
    // console.log(require('@/static/json/mPermissionByUser.json').data)
    // this.$store.dispatch(updateMenuAuthority(require('@/static/json/mPermissionByUser.json').data));
    POST('/toDo/mPermissionByUser', {
        data:{
          empId: sessionStorage.getItem('empId'),
          positNum: sessionStorage.getItem('positNum'),
        }
    })
    .then((res) => {
      if (res.success) {
        this.$store.dispatch(updateHandleAuthority(res.resultB));
        this.$store.dispatch(updateMenuAuthority(res.data));
      }
    });
  }
  
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <Provider store={store}>
              <AppRouter/>
          </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
