// 是否开发环境
const isDev = process.env.NODE_ENV === 'development';

const AppConfig = {
    isDev: isDev,
    API: isDev? 'local': '',
    language: (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
}

export const languagePkg = {
    'zh': {
        menu: {
            
        },
        common: {
            submit: '保存',
            cancel: '取消',
            add: '新增'
        }
    },
    'en': {
        common: {
            submit: '保存',
            cancel: '取消',
            add: '新增'
        }
    }
}
export default AppConfig