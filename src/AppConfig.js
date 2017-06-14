// 是否开发环境
const isDev = process.env.NODE_ENV === 'development';

const AppConfig = {
    isDev: isDev,
    API: isDev? 'local': ''
}

export default AppConfig