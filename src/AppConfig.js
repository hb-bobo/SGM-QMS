// 是否开发环境(开发和打包代码不同时可灵活应用此变量)
const isDev = process.env.NODE_ENV === 'development';

// proxy设置再package.json.proxy中， proxyMatch会被替换为'空' 并代理到目标源(target)
// eslint-disable-next-line 
const proxyMatch = '/localhost';

// 工程名
const projectName = '/pims'; // '/pims';

// eslint-disable-next-line 
const BASE_URL = window.location.origin + projectName; // const BASE_URL = window.location.origin + window.location.pathname.replace(/(toLogin)|(\w+\.(html|jsp))/, '');

// BASE_URL + proxyMatch
// eslint-disable-next-line 
const DEV_API = 'http://localhost:8090/QMS'// 'http://10.203.99.56:7003/QMS'; 'http://localhost:8081' 'http://10.203.99.58/QMS'

const AppConfig = {
    isDev: isDev,
    // API: isDev? DEV_API : BASE_URL,
    API: DEV_API,
    language: (window.navigator.language || window.navigator.browserLanguage).split('-')[0],
    listConfig: {
        count: 20 // 每个list每次加载多少条数据
    }
}

export default AppConfig