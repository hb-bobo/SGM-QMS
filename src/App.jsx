import * as React from 'react';
import AppRouter from './router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {cyan500} from 'material-ui/styles/colors';
import './static/css/base.css';
import './static/css/app.css';
import './static/css/common.css';
// iconfont 如果有大量waring 在第一行加上  // eslint-disable-next-line 
import './static/fonts/iconfont.js';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#333333',
  }
});

class App extends React.Component{
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <AppRouter/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
