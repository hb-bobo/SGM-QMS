
/**
 * componentWillMount钩子
 * 设置组件的listData，和请求列表数据方法
 */
export default function componentWillMount (this: any): void {
    var keys: Array<string> = Object.keys(this.state);
    var willSetKeys: string[] = ['listData', 'pageNumber', 'scrollConfig'];
    willSetKeys.some((key: string) => {
        if (keys.indexOf(key) !== -1) {
            throw Error('state的key重复了:' + key);
        }
        return false;
    })
    this.setState({
        listData: [],
        pageNumber: 1, // 默认第一页
        scrollConfig: {
            upContent: ''
        }
    });
    this.mountedStatus = true;
}