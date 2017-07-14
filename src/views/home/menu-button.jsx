import * as React from 'react';


const MenuButton = (props) => {
    var {
        iconName,
        text
    } = props;

    return (
        <div className="home-menu-item">
            <svg className={`icon icon-${iconName}`}>
                <use xlinkHref={`#icon-${iconName}`}></use>
            </svg>
            <span className="text-center" style={{marginTop: '14px'}}>
                {text}
            </span>
        </div>
    )
}

export default MenuButton;