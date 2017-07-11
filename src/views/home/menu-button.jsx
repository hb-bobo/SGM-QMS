import * as React from 'react';


const MenuButton = (props) => {
    var {
        iconName,
        text
    } = props;

    return (
        <div className="home-menu-item">
            <svg className="icon">
                <use xlinkHref={`#icon-${iconName}`}></use>
            </svg>
            <span className="text-center">
                {text}
            </span>
        </div>
    )
}

export default MenuButton;