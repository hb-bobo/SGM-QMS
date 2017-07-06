// 是否开发环境
const isDev = process.env.NODE_ENV === 'development';
const AppConfig = {
    isDev: isDev,
    API: isDev? 'local': window.location.origin + window.location.pathname.replace(/\w+\.(html|jsp)/, ''),
    language: (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
}

export default AppConfig