
interface Msg {
    [x: string]: any
}

class Intl {
    private msg: Msg;
    private language: string;
    constructor () {
        this.msg = {};
    }
    // get 当前页的数据
    get (key: string): string {
        return this.msg[key]
    }
    // set 当前页的数据
    setMsg (localeData: Msg): void {
        this.msg = localeData
    }
    // 设置语言环境
    setLanguage (language: string): void {
        this.language = language
    }
}

const init = new Intl();
export default init;