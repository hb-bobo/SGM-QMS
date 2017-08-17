import * as React from 'react';
import PropTypes, {DefaultProps} from './PropTypes';
import * as ReactPropTypes from 'prop-types';
import store from '@/store';
import { MenuAuthority } from '@/store/reducer/access'; // interface

export var menuAuthoritys: MenuAuthority[] = store.getState().access.menuAuthoritys; // 所有菜单权限

/**
 * 通过方法拿权限结果(某些情况下不能render，就用此方法)
 * @param {string} PATH
 * @param {string} 是否为包涵模式
 * @return {boolean}
 */
export function getAccess (PATH: string, model: string = 'none'): boolean {
    var accessable: boolean = false;
    menuAuthoritys.some((item: MenuAuthority) => {
        
        if (model === 'none' && PATH === item.PERMISSION_CODE) {
            accessable = true;
            return true;
        }
        if (model === 'includes' && (item.PERMISSION_CODE.indexOf(PATH) !== -1)) {
            accessable = true;
            return true;
        }
        return false;
    });
    accessable = true;
    return accessable;
}

/**
 * 权限包裹层
 * Access
 */
export default class Access extends React.Component<PropTypes, {}> {

    public static defaultProps: DefaultProps = {
        PATH: '',
    }

    public static contextTypes = {
        store: ReactPropTypes.object.isRequired
    }

    public state: StateTypes = {
        accessable: false, // 是否有访问权
    }
    
    private unsubscribe: Function; // 取消stroe订阅方法
    
    /**
     * 通过方法拿权限结果(某些情况下不能render，就用此方法)
     * @param {string} PATH 
     * @param {boolean} 是否为包涵模式 includes | none
     * @return {boolean}
     */
    public static getAccess (PATH: string, model: string): boolean {
        return getAccess(PATH, model) as boolean;
    }

    componentDidMount () {
        var {store} = this.context;
        // 订阅store and set menuAuthoritys value
        if (menuAuthoritys.length === 0) {
            menuAuthoritys = store.getState().access.menuAuthoritys;
            this.unsubscribe = store.subscribe(() => {
                menuAuthoritys = store.getState().access.menuAuthoritys;
                this.setState({});
            });
        }
    }

    componentWillUnmount () {
        if (typeof this.unsubscribe === 'function') {
            this.unsubscribe();
        }
    }
    
    render () {
        // var { accessable } = this.state;
        // var { menuAuthoritys } = this.state;
        var accessable: boolean = false;
        var Children: React.ReactChildren = this.props.children;
        var {PATH} = this.props;
        
        // 如果相等，则有权限(PERMISSION_CODE 不会重复)
        // menuAuthoritys.some((item: MenuAuthority) => {
        //     if (PATH === item.PERMISSION_CODE) {
        //         accessable = true;
        //         return true;
        //     }
        //     return false;
        // });
        accessable = getAccess(PATH, this.props.model);
        accessable = true;
        return (
            <span>
                {accessable ? React.Children.toArray(Children).map(c => c) : null}
            </span>
        );
    }
}

interface StateTypes {
    accessable: boolean;
}
// interface ContextTypes {
//     store: any
// }
