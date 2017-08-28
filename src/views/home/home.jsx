import * as React from 'react';
import PropTypes from 'prop-types';
import {updateMenuAuthority, updateHandleAuthority} from '@/store/actions';

import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Toast } from 'antd-mobile';
// components
import Access from '@/components/Access';
import intl from '@/components/intl';
import ReactSwiper, {SwiperWrapper} from '@/components/swiper';
import LazyImg from '@/components/lazy-img';
import HSelect from '@/components/form/h-select';
import { POST } from '@/plugins/fetch';
import array2Array from '@/utils/array/array2Array';
import AppConfig from '@/AppConfig';

// view
import MenuButton from './menu-button';
import MoreMenu from './more.jsx';
import './index.css';
import home_top from '@/static/images/home_top.jpg';

// import slideCar1 from '@/static/images/slide/slide-car1.png';
// import slideCar2 from '@/static/images/slide/slide-car2.png';
// import slideCar3 from '@/static/images/slide/slide-car3.png';
// import slideCar4 from '@/static/images/slide/slide-car4.png';
// import slideCar5 from '@/static/images/slide/slide-car5.png';
// import slideCar6 from '@/static/images/slide/slide-car6.png';
// 加载本地语言包
import(/* webpackChunkName: "intl" */ './locale')
.then((intlMsg) => {
  intl.setMsg(intlMsg);
});

// 10.6.96.190:8090
var homeTopBg = {
  backgroundImage:  `url(${home_top})`
}

// 轮播图url(取pc端的)
var bannerImgUrl = [
  AppConfig.API + '/static/img/slide/slide-car1.png',
  AppConfig.API + '/static/img/slide/slide-car2.png',
  AppConfig.API + '/static/img/slide/slide-car3.png',
  AppConfig.API + '/static/img/slide/slide-car4.png',
  AppConfig.API + '/static/img/slide/slide-car5.png',
  AppConfig.API + '/static/img/slide/slide-car6.png',
];

var timer = {
  time: 0,
  timer: null
}; // doSomething 三击要用到

/* 首页 */
class HomePage extends React.Component{
  static contextTypes = {
    language: PropTypes.string,
    setLanguage: PropTypes.func,
    router: PropTypes.object,
    store: PropTypes.object,
  }
  state = {
    showMore: false,
    personalInfo: [],
    selectedId: {}
  }

  componentDidMount () {

    // 有可能执行到这App.jsx还没拿到empId，所以，就利用下redux的订阅功能
    if (sessionStorage.getItem('empId') === null) {
      this.unsubscribe = this.$store.subscribe(() => {
        if (!this.state.personalInfo.length && sessionStorage.getItem('empId') !== null) {
          this.getInfo();
          this.unsubscribe();
        }
      });
    } else {
      // empId存在就直接调
      this.getInfo();
    }
    
    this.$store.dispatch({
      type: 'clearOldTabValue',
      payload: true
    });
  }
  componentWillUnmount () {
  }
  /**
   * 获取身份信息
   */
  getInfo () {
    POST('/monthReport/mIndex', {
        data:{
          empId: sessionStorage.getItem('empId')
        }
    }).then((res) => {
      if (res.success && res.data.length > 0) {
        return res.data
      }
    }).then((data) => {
      if (data === undefined) {
        return;
      }
      this.setState({
        personalInfo: data
      });
      this.changeId(data[0].DEPT_ID);
    })
  }

  /**
   * 获取权限信息
   * @param {string}
   */
  getAccess (positNum) {
    POST('/toDo/mPermissionByUser', {
        data:{
          empId: sessionStorage.getItem('empId'),
          positNum: positNum,
        }
    })
    .then((res) => {
      if (res.success) {
        this.$store.dispatch(updateHandleAuthority(res.resultB));
        this.$store.dispatch(updateMenuAuthority(res.data));
      }
    });
  }
  
  /* change身份 */
  changeId (id) {
    this.state.personalInfo.some((info) => {
      if (info.DEPT_ID === id) {
        this.setState({
          selectedId: info
        });
        this.getAccess(info.POSIT_NUM);
        return true;
      }
      return false;
    });
  }
  showMore = () => {
    Toast.info(intl.get('noMoreMenu'), 1.5)
    // this.setState({showMore: true})
  }

  /**
   * 这里做些测试(timer.time 为几就代表要快速点击几下)
   */
  doSomething = (e) => {
    clearTimeout(timer.timer);
    timer.time++;
    timer.timer = setTimeout(function() {
      timer.time = 0;
    }, 400);
    if (timer.time === 3) {
      this.context.router.history.push('/toLogin');
    }
  }
  /*常用的菜单 element*/
  commonMenu () {
    return (
      <div className="home-menu">
          <Access PATH="manage/overview">
            <div className="menu-wrap">
                <Link to="/manage/overview">
                    <MenuButton iconName="project" text="项目质量" bgName="leftBottom"/>
                </Link>
            </div>
          </Access>
          <Access PATH="manage/aftermarket">
            <div className="menu-wrap">
                <Link to="/manage/aftermarket">
                    <MenuButton iconName="after-sale" text="售后质量" bgName="leftBottom"/>
                </Link>
            </div>
          </Access>
          <Access PATH="manage/report">
            <div className="menu-wrap">
              <Link to="/manage/report">
                <MenuButton iconName="monthly" text="质量月报" bgName="leftBottom"/>
              </Link>
            </div>
          </Access>
          <Access PATH="notice" model="includes">
            <div className="menu-wrap">
              <Link to="/notice">
                <MenuButton iconName="notice2" text="通知中心" bgName="leftBottom"/>
              </Link>
            </div>
          </Access>
          <Access PATH="todo" model="includes">
            <div className="menu-wrap">
              <Link to="/todo">
                <MenuButton iconName="msg" text="待办事项"/>
              </Link>
            </div>
          </Access>
          
          <Access PATH="" model="includes">
            <div className="menu-wrap">
              <Link to="/" onClick={() => Toast.info('II期发布,敬请期待')}>
                <MenuButton iconName="department" text="部门质量" />
              </Link>
            </div>
          </Access>

          <Access PATH="" model="includes">
            <div className="menu-wrap">
              <Link to="/" onClick={() => Toast.info('II期发布,敬请期待')}>
                <MenuButton iconName="person" text="EQR评审" />
              </Link>
            </div>
          </Access>

          <div className="menu-wrap" onClick={this.showMore}>
              <MenuButton iconName="function" text="更多功能"/>
          </div>
        </div>
    )
  }
  render () {

    var {selectedId, personalInfo} = this.state;
    
     return (
        <div className="home" style={{height: window.innerHeight}}>
          <div className="home-top" style={homeTopBg}>
          </div>
          <ReactSwiper
            containerStyle={{
              height: '30vh'
            }}
          >   
              <SwiperWrapper>
                {
                  bannerImgUrl.map((url, i) => (
                    <LazyImg key={i} style={{height: '100%'}} url={url}/>
                  ))
                }
              </SwiperWrapper>
          </ReactSwiper>

          <div className="home-info">
            <div className="flex-row">
              <div className="flex-col-8">
                <div style={{paddingBottom: '10px', marginBottom: '10px'}}>
                  <span>{intl.get('job')}: </span>
                  <HSelect
                      containerStyle={{position: 'relative', top: '-0.5px', width: '150px'}}
                      style={{border: '0px'}}
                      value={this.state.selectedId.DEPT_ID}
                      onChange={(e) => this.changeId(e.target.value)}
                      isFirstEmpty={false}
                      options={
                        array2Array({
                          data: personalInfo,
                          format: ['text', 'value'],
                          originaFormat: ['POSIT_DESC', 'DEPT_ID']
                        })
                      }
                  />
                </div>
                <div>
                  <span>{intl.get('department')}: </span>
                  <span>{selectedId.DEPT_CHN_DESC}</span>
                </div>
              </div>
              <div className="flex-col-2">
                <div className="icon-wrap" onClick={this.doSomething}>
                  <svg className="icon info" aria-hidden="true">
                    <use xlinkHref="#icon-geren"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {
            this.state.showMore ? <MoreMenu/> : this.commonMenu()
          }
        </div>
    );
  }
}
export class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me']};
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
export default HomePage
