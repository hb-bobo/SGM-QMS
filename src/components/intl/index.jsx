import * as React from 'react';

class Intl extends React.Component{
    state = {

    }
    // get 当前页的数据
    get (key) {
        return this.msg[this.language][key];
    }
    // set 当前页的数据
    setMsg (localeData) {
        this.msg = localeData;
    }
    // 设置语言环境
    setLanguage (language) {
        this.language = language;
    }
    render () {
        return (
            <span></span>
        )
    }
}

export default Intl