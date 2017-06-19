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
import './static/css/cover.css';
// iconfont 如果有大量waring 在第一行加上  // eslint-disable-next-line 
import './static/fonts/iconfont.js';
const muiTheme = getMuiTheme({
  appBar: {
    height: 48
  },
  palette: {
    primary1Color: '#333333',
  }
});

addLocaleData([...en, ...zh]);
class App extends React.Component{
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
          <IntlProvider locale={AppConfig.language} messages={languagePkg.en}>
            <Provider store={store}>
              <AppRouter/>
            </Provider>
          </IntlProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
