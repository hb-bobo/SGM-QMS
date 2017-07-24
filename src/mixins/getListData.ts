import { POST } from '@/plugins/fetch';
import AppConfig from '@/AppConfig';

interface Param {
    empId: string,
    pageSize: number | string,
    pageNumber: number | string,
    positNum: string
}
/**
 * 加载数据
 * @param {'up' | 'down'} 上拉还是下拉
 * @param {string[]} (需要额外传参时用) 取state上的key(参数都放state上)
 */
export default function getListData (this: any, action: string, stateKes: string[]): void {

    if (action === 'down') {
        this.setState({
            pageNumber: 1,
            scrollConfig: {
                upContent: ''
            }
        });
    }
    if (this.props.getListDataAPI === undefined) {
        throw Error('props.getListDataAPI is required');
    }
    if (this.refs.scroller === undefined) {
        throw Error('this.refs.scroller is required');
    }
    var defaultParam: Param = {
        'empId': 'P0892',
        'pageSize': AppConfig.listConfig.count,
        'pageNumber': this.state.pageNumber,
        'positNum': 'A3010274'
    }
    // 如果需要额外传参，就从state上取，并合并
    if (Array.isArray(stateKes)) {
        stateKes.forEach((key) => Object.assign(defaultParam, {
            [key]: this.state[key]
        }));
    }
    // AppConfig.listConfig.count 每次加多少条
    POST(this.props.getListDataAPI, {
        data: defaultParam,
    })
    .then((res: any) => {
        if (this.mountedStatus === null) { return; }
        
        if (res.success === true) {
            var listData;
            
            // 刷新直接赋值，加载更多要保留原来的数据
            // 下拉结束
            if (action === 'down') {
                this.refs.scroller.donePulldown();
                listData = res.data;
            } else if (action === 'up') {
                // 上拉结束
                this.refs.scroller.donePullup();
                listData = this.state.listData.concat(res.data);
            }
            this.setState({
                listData: listData,
                pageNumber: this.state.pageNumber + 1,
            });
            if (res.data.length < AppConfig.listConfig.count) {
                this.setState({
                    scrollConfig: {
                        upContent: 'No More'
                    }
                });
            }
        }
    });
}