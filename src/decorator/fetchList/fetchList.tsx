import * as React from 'react';
import { POST } from '@/plugins/fetch';
import AppConfig from '@/AppConfig';

// 需要包裹的组件的props接口
interface WrapedComponentPropTypes {
    listData: Array<any>;
    pageNumber: number;
    noMoreData: boolean;
    getListData: Function;
    loadingMore: Function;
    setListData: Function;
}
/*必备参数 */
interface Param {
    empId: string | null,
    pageSize: number | string,
    pageNumber: number | string,
    positNum: string | null
}
/*额外的参数 */
interface ExtraParam {
    [x: string]: any
}

function getDisplayName (component: React.ComponentClass<{}>): string {
    return component.displayName || component.name || 'Component';
}

/**
 * 获取列表，刷新，加载更多
 * 此高阶组件会在组件外面包一层，有点类似react-redux的connect
 * @param {string} 请求的API
 * @return {React.ComponentClass} 返回一个被包裹好的组件
 */
export default (getListDataAPI: string) => (WrapedComponent: React.ComponentClass<WrapedComponentPropTypes>) => {

    return class FetchList extends React.Component<WrapedComponentPropTypes, any> {
        static displayName: string =  `GetList(${getDisplayName(WrapedComponent)})`;
        static mountedStatus: boolean | null = true;

        componentWillMount (): void {
            var keys: Array<string> = Object.keys(this.props);
            var willSetKeys: string[] = ['listData', 'pageNumber', 'noMoreData', 'getListData', 'loadingMore'];
            // 这几个key是必须的，所以父传给组件不能冲突
            willSetKeys.some((key: string) => {
                if (keys.indexOf(key) !== -1) {
                    throw Error('props的key重复了:' + key);
                }
                return false;
            });
            this.setState({
                listData: [],
                pageNumber: 1, // 默认第一页
                noMoreData: false
            });
            FetchList.mountedStatus = true;
        }

        componentWillUnmount (): void {
            FetchList.mountedStatus = null;
        }
        /**
         * 加载数据
         * @param {'up' | 'down'} 上拉还是下拉
         * @param {Function} scroller 成功回调函数
         * @param {Function} scroller 成功失败函数
         * @param {string[]} (需要额外传参时用) 取state上的key(参数都放state上)
         */
        getListData = (action: string, resolve: Function, reject: Function, params?: ExtraParam): void => {
            if (action === 'down') {
                this.setState({
                    pageNumber: 1
                });
            }
            if (getListDataAPI === undefined) {
                throw Error('fetchList param getListDataAPI is required');
            }
            var defaultParam: Param = {
                'empId': sessionStorage.getItem('empId'),
                'pageSize': AppConfig.listConfig.count,
                'pageNumber': this.state.pageNumber,
                'positNum': sessionStorage.getItem('positNum')
            }
            // 如果需要额外传参，就并合并
            if (params !== undefined) {
                for (let key in params) {
                    if (defaultParam[key] !== undefined) {
                        throw Error('额外的参数的key有重复');
                    } else {
                        defaultParam[key] = params[key];
                    }
                }
            }
            // AppConfig.listConfig.count 每次加多少条
            POST(getListDataAPI, {
                data: defaultParam,
            }).then((res: any) => {
                if (FetchList.mountedStatus === null) { return; }
                if (res.success === true) {
                    var listData;
                    
                    // 刷新直接赋值，加载更多要保留原来的数据
                    // 下拉结束
                    if (action === 'down') {
                        // this.refs.scroller.donePulldown();
                        listData = res.data;
                    } else if (action === 'up') {
                        // 上拉结束
                        // this.refs.scroller.donePullup();
                        listData = this.state.listData.concat(res.data);
                    }
                    this.setState({
                        listData: listData,
                        pageNumber: this.state.pageNumber + 1,
                    });
                    // 成功
                    if (resolve) {
                        resolve();
                    }
                    if (res.data.length < AppConfig.listConfig.count) {
                        this.setState({
                            noMoreData: true
                        });
                    }
                }
            }).catch(() => {
                if (reject) {
                    reject();
                }
            });

        }
        /**
         * @param {Function} scroller 成功回调函数
         * @param {Function} scroller 成功失败函数
         */
        loadingMore = (resolve: Function, reject: Function): void => {
            this.getListData('up', resolve, reject);
        }
        /**
         * 设置listData，如果不需要发送请求更新列的时候用
         * @param {Array} 新的列表
         */
        setListData = (newListData: Array<any>): void => {
            this.setState({
                listData: newListData
            });
        }
        render () {
            return (
                 <WrapedComponent
                    getListData={this.getListData}
                    loadingMore={this.loadingMore}
                    setListData={this.setListData}
                    {...this.state}
                    {...this.props}
                 />
            );
        }
    }
}
