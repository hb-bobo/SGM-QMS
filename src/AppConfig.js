// 是否开发环境
const isDev = process.env.NODE_ENV === 'development';
// proxy设置再package.json.proxy中， proxyMatch会被替换为空并代理到目标源(target)
const proxyMatch = '/localhost';
// 工程名
const projectName = 'QMS';
// "http://10.11.146.18:6080/QMS/
const BASE_URL = window.location.origin + window.location.pathname.replace(/\w+\.(html|jsp)/, '') + projectName;
// BASE_URL + proxyMatch
// const DEV_API = 'http://10.200.36.46:6080/QMS';
const AppConfig = {
    isDev: isDev,
    API: isDev? BASE_URL + proxyMatch: BASE_URL,
    language: (window.navigator.language || window.navigator.browserLanguage).split('-')[0],
    listConfig: {
        count: 10 // 每个list每次加载多少条数据
    }
}

export default AppConfig