import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// fetch polyfill
import 'whatwg-fetch'; 
import App from './App';
import AppConfig from './AppConfig';
var injectTapEventPlugin = require('react-tap-event-plugin');
// tap Event plugin --> onTouchTap={}
injectTapEventPlugin();

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
AppConfig.isDev && registerServiceWorker();
