interface Msg {
    [x: string]: any
}

class intl {
    private msg: Msg;
    constructor () {
        this.msg = {};
    }
    get (key: string) {
        return this.msg[key]
    }
    setMsg (localeData: Msg) {
        this.msg = DataCue
    }
}