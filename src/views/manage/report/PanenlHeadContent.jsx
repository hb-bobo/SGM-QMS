import * as React from 'react';

/* export default class PanenlHeadContent extends React.Component {
    static defaultProps = {
        leftContent:　'',
        rightContent: ''
    }

    render () {
        var {leftContent, rightContent} = this.props;
        return (
            <div  className="flex-row">
                <div className="flex-col-1 text-left">
                    <span>{leftContent}</span>
                </div>
                <div className="flex-col-1 text-right">
                    <span>{rightContent}</span>
                </div>
            </div>
        )
    }
} */
export default function PanenlHeadContent (props) {
    var {leftContent, rightContent} = props;
    return (
        <div  className="flex-row">
            <div className="flex-col-1 text-left">
                <span>{leftContent}</span>
            </div>
            <div className="flex-col-1 text-right">
                <span>{rightContent}</span>
            </div>
        </div>
    )
}