import { POST } from '@/plugins/fetch';
import AppConfig from '@/AppConfig';
/**
 * 加载数据
 * @param {'up' | 'down'} 上拉还是下拉
 */
export default function getListData (this: any, action: string): void {

    if (action === 'down') {
        this.setState({
            pageNumber: 1,
            scrollConfig: {
                upContent: ''
            }
        });
    }
    
    // AppConfig.listConfig.count 每次加多少条
    POST(this.props.getListDataAPI, {
        data: {
            'empId': 'P0892',
            'pageSize': AppConfig.listConfig.count,
            'pageNumber': this.state.pageNumber,
            'positNum': 'A3010274'
        },
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
                if (this.refs.scroller !== undefined) { this.refs.scroller.donePullup() }
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