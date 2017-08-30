import * as React from 'react';


const MenuButton = (props) => {
    var {
        iconName,
        text,
        bgName
    } = props;

    return (
        <div className={bgName === 'leftBottom' ? 'home-menu-item gb0' : 'home-menu-item gb1'}>
            <svg className={`icon icon-${iconName}`}>
                <use xlinkHref={`#icon-${iconName}`}></use>
            </svg>
            <span className="text-center">
                {text}
            </span>
        </div>
    )
}

export default MenuButton;