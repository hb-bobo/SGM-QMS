import * as React from 'react';
//import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import SpaceRow from '../space-row';
import FlatButton from 'material-ui/FlatButton';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class List extends React.Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.setState({open: false});
    }
    loadMore = () => {
        this.handleOpen()
        console.log(this)
    }

    render () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                onTouchTap={this.handleClose}
            />
        ];
        var { children } = this.props;
        return (
            <div>
                <SpaceRow/>
                <div>
                    {children.map(child => child)}
                    <div className="text-center list-more" onTouchTap={this.loadMore}>
                        查看详情
                    </div>
                </div>
                {this.state.open?
                    <Dialog
                        actions={actions}
                        modal={false}
                        contentStyle={customContentStyle}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                        >
                        {this.props.details}
                    </Dialog>: false}
            </div>
        )
    }
}

export default List