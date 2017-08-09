import * as React from 'react';
import PropTypes, {DefaultProps} from './PropTypes';
interface StateTypes {
    accessable: boolean;
}

/**
 * 权限包裹层
 * Access
 */

export default class Access extends React.Component<PropTypes, {}> {
    static defaultProps: DefaultProps = {
        PATH: ''
    }
    state: StateTypes = {
        accessable: false // 是否有访问权
    }
    componentDidMount () {console.log(typeof this.props.children)
        var {PERMISSION_CODE , PATH} = this.props;
        if (PERMISSION_CODE === PATH) {
            this.setState({
                accessable: true
            });
        }
    }
    render () {
        var { accessable } = this.state;
        var Children: React.ReactChildren = this.props.children;
        var span: React.ReactElement<{}> = React.createElement('span');
        return (accessable && Children['$$typeof'] === 'Symbol(react.element)') ? span : span;
    }
}