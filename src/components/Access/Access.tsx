import * as React from 'react';
import PropTypes, {DefaultProps} from './PropTypes';
import * as ReactPropTypes from 'prop-types';
import store from '@/store';
import { MenuAuthority, HandleAuthority } from '@/store/reducer/access'; // interface

export var menuAuthoritys: MenuAuthority[] = store.getState().access.menuAuthoritys; // 所有菜单权限

export var handleAuthoritys: HandleAuthority[] = store.getState().access.handleAuthoritys; // 所有按钮权限
/**
 * 通过方法拿权限结果
 * @param {string} PATH
 * @param {string} 是否为包涵模式
 * @param {MenuAuthority[] | HandleAuthority[]} 数据
 * @return {boolean}
 */
export function getAccess (PATH: string, model: string = 'none', data: any[]): boolean {
    var accessable: boolean = false;

    data.some((item: any) => {
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
    return accessable;
}

/**
 * 权限包裹层
 * Access
 */
export default class Access extends React.Component<PropTypes, {}> {

    public static defaultProps: DefaultProps = {
        PATH: '',
        type: 'menu',
        className: ''
    }

    public static contextTypes = {
        store: ReactPropTypes.object.isRequired
    }

    public state: StateTypes = {
        accessable: false, // 是否有访问权
    }
    
    private unsubscribe: Function; // 取消stroe订阅方法(菜单)
    private unsubscribe1: Function; // 取消stroe订阅方法(按钮权限)
    private isMount: Boolean;
    /**
     * 通过方法拿权限结果(这是静态方法 某些情况下不能在render中用，就用此方法Access.getAccess(xxxx))
     * @param {string} PATH 
     * @param {boolean} 是否为包涵模式 includes | none
     * @return {boolean}
     */
    public static getAccess (PATH: string, model: string): boolean {
        // 一般来说是菜单权限才用此方法，所以data 参数就写死为menuAuthoritys
        return getAccess(PATH, model, store.getState().access.menuAuthoritys) as boolean;
    }

    componentDidMount () {
        var {store} = this.context;
        this.isMount = true;
        // 订阅store and set menuAuthoritys and handleAuthoritys value
        if (menuAuthoritys.length === 0) {
            menuAuthoritys = store.getState().access.menuAuthoritys;
            this.unsubscribe = store.subscribe(() => {
                var access = store.getState().access;
                menuAuthoritys = access.menuAuthoritys;
                if (this.isMount === true) {
                    this.setState({});
                }
            });

        }
        if (handleAuthoritys.length === 0) {
            handleAuthoritys = store.getState().access.handleAuthoritys;
            this.unsubscribe1 = store.subscribe(() => {
                var access = store.getState().access;
                handleAuthoritys = access.handleAuthoritys;
                if (this.isMount === true) {
                    this.setState({});
                }
            });

        }
    }

    componentWillUnmount () {
        this.isMount = false;
        if (typeof this.unsubscribe === 'function') {
            this.unsubscribe();
            
        }
        if (typeof this.unsubscribe1 === 'function') {
            this.unsubscribe1();
            
        }
    }
    
    render () {
        // var { accessable } = this.state;
        // var { menuAuthoritys } = this.state;
        var accessable: boolean = false;
        var Children: React.ReactChildren = this.props.children;
        var {PATH, type, className} = this.props;
        
        var data: any = [];
        switch (type) {
            case 'menu':
                data = menuAuthoritys;
                break;
            case 'button':
                data = handleAuthoritys;
                break;
            default: 
                break;
        }
        accessable = getAccess(PATH, this.props.model, data);

        return (
            <span className={className}>
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
