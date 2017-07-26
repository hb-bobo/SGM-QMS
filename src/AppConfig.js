// 是否开发环境 (locale 去 package.json 的proxy改代理ip)
const isDev = process.env.NODE_ENV === 'development';
const BASE_URL = window.location.origin + window.location.pathname.replace(/\w+\.(html|jsp)/, '');

const AppConfig = {
    isDev: isDev,
    API: isDev? BASE_URL + 'localhost/QMS': BASE_URL,
    language: (window.navigator.language || window.navigator.browserLanguage).split('-')[0],
    listConfig: {
        count: 10 // 每个list每次加载多少条数据
    }
}

export default AppConfig