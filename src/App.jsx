import * as React from 'react';
import AppRouter from './router';
import store from './store';
// 各种Provider
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {addLocaleData} from 'react-intl';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import AppConfig, { languagePkg } from './AppConfig';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
console.log(muiTheme)
addLocaleData([...en, ...zh]);

// use $store every where
React.Component.prototype.$store = store;
// 
class App extends React.Component{
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
            <Provider store={store}>
              <IntlProvider locale={AppConfig.language} messages={languagePkg.en}>
                <AppRouter/>
              </IntlProvider>
            </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
