var get = require('lodash/get');

interface Msg {
    [x: string]: string
}
interface LocaleData {
    [x: string]: {
        [x: string]: string
    }
}
/**
 * 
 * first,set language
 * then setMsg
 * last get
 * setMsg加载过语言包，子组件子页面里就不用加载了，但子组件可以继续加载不同的语言包，如果有冲突，尽量在外层加载
 */
class Intl {
    private msg: Msg;
    private language: string;

    constructor () {
        this.msg = {};
        this.language = 'zh';
    }
    // get 当前页的数据 key = 'key' key = 'key.childKey'
    get (key: string): string {
        return get(this.msg, key);
    }
    // set 当前页的数据
    setMsg (...localeData: LocaleData[]): void {

        // if (localeData.length === 1) {
        //     this.msg = localeData[0][this.language];
        //     return;
        // }
        // if localeData is a array and length greater than 1, merge it
        var newMsg: Msg = this.msg;

        localeData.forEach( (localeDataItem: LocaleData) => {
            // 只提取一种语言
            var tempMsg: Msg  = localeDataItem[this.language];
            // 合并(key不能重复)
            for (let key in tempMsg) {
                if (newMsg[key] === undefined || newMsg[key] === '') {
                    newMsg[key] = tempMsg[key];
                } else {
                    window.console.warn('localeData has repetitive key [localeData 有重复的key,最好是不要重复],key:' + key);
                }
            }
        });
        this.msg = newMsg;
    }
    // 设置语言环境
    setLanguage (language: string): void {
        this.language = language;
    }
}

export default new Intl();