import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppConfig from './AppConfig';
// fetch polyfill
// import 'whatwg-fetch'; 
import App from './App';
var injectTapEventPlugin = require('react-tap-event-plugin');
// tap Event plugin --> onTouchTap={}
injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
AppConfig.isDev && registerServiceWorker();
