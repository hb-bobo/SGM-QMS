import * as React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
/**
 * 对swiper react化
 */
export default class ReactSwiper extends React.Component {
    static defaultProps = {
        containerStyle: {
            width: '100%'
        },
        options: {
            grabCursor: true,
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 2,
            loop: false,
            autoplay: 2500,
        }
    }
    static propTypes = {
        containerStyle: PropTypes.object
    }

    state = {

    }
    componentDidMount () {
        var {options} = this.props;
        this.swiper = new Swiper(this.swiperContainer, {
            ...options,
            pagination: this.swiperPagination,
        });
    }
    
    render () {
        var  {containerStyle, children} = this.props;
        var childrens = React.Children.toArray(children);
        return (
            <div
                className="swiper-container"
                ref={ref => this.swiperContainer = ref}
                style={containerStyle}
            >
                {childrens.map(child => child)}
                <div className="swiper-pagination" ref={ref => this.swiperPagination = ref}></div>
            </div>
        );
    }
}

export class SwiperWrapper extends React.Component {
    componentDidMount () {
    }
    render () {
        var  {children} = this.props;
        var childrens = React.Children.toArray(children);
        return (
            <div className="swiper-wrapper">
                {
                    childrens.map((child, i) => (
                        <div className="swiper-slide" key={i}>{child}</div>
                    ))
                }
            </div>
        )
    }
}
