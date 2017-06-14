import * as React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Logged extends React.Component {
    
    state = {
        open: null
    }

    static defaultProps = {
        menuList: []
    }

    static propTypes = {
        menuList: PropTypes.array
    }

    /**
     * @param {string} router path
     */
    go (path) {
        this.props.history.push(path, 'aa')
    }

    render () {
        var  menuList = this.props.menuList;
        return (
             <IconMenu
                iconStyle={this.props.iconStyle}
                open={this.state.open}
                iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                {menuList.map((item, i) => (
                    <MenuItem
                        key={i}
                        primaryText={item.text} 
                        data-path={item.path}
                        onClick={() => {
                            this.go(item.path)
                        }}
                    />
                ))}
            </IconMenu>
        )
    }
}
Logged.muiName = 'IconMenu';

export default Logged