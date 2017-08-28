export interface DefaultProps {
    PATH: string; // 本地事先设置好的路径或者标识
    type: 'menu' | 'button'; // 菜单权限和 按钮权限对比的数据源不一样
    className: string;
}

interface PropTypes extends DefaultProps {
    children: React.ReactChildren;
    model: 'none' | 'includes'; // includes 只要包涵就会判定为有权限, 默认为none, 需要绝对相等
    PERMISSION_CODE: string; // 传进来的路径或者标识
}

export default PropTypes;
