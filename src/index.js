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

// 禁止浏览器(微信)自带下拉
document.body.addEventListener('touchmove', function (e) {
  // console.log(e.target, e.cancelable, e.defaultPrevented)
  // e.preventDefault();
  
}, true);

AppConfig.isDev && registerServiceWorker();
