import * as React from 'react';
import PropTypes, {DefaultProps} from './PropTypes';
import * as ReactPropTypes from 'prop-types';
// import store from '@/store';
import { MenuAuthority } from '@/store/reducer/access'; // interface
/**
 * 权限包裹层
 * Access
 */

export default class Access extends React.Component<PropTypes, {}> {
    static defaultProps: DefaultProps = {
        PATH: ''
    }
    static contextTypes = {
        store: ReactPropTypes.object.isRequired
    }
    state: StateTypes = {
        accessable: false, // 是否有访问权,
        menuAuthoritys: [] // 所有菜单权限
    }
    componentDidMount () {
        var {store} = this.context;
        // 订阅store
        store.subscribe(() => {
            this.setState({
                menuAuthoritys: store.getState().access.menuAuthoritys
            });
        });
    }
    render () {
        // var { accessable } = this.state;
        var { menuAuthoritys } = this.state;
        var accessable: boolean = false;
        var Children: React.ReactChildren = this.props.children;
        var {PATH} = this.props;
        
        // 如果相等，则有权限(PERMISSION_CODE 不会重复)
        menuAuthoritys.some((item: MenuAuthority) => {
            if (PATH === item.PERMISSION_CODE) {
                accessable = true;
                return true;
            }
            return false;
        });
        return (
            <span>
                {accessable ? React.Children.toArray(Children).map(c => c) : null}
            </span>
        );
    }
}

interface StateTypes {
    accessable: boolean;
    menuAuthoritys: MenuAuthority[];
}
// interface ContextTypes {
//     store: any
// }
