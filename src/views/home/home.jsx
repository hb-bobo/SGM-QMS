import * as React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Toast } from 'antd-mobile';

import Access from '@/components/Access';
import intl from '@/components/intl';
import { POST } from '@/plugins/fetch';
import MenuButton from './menu-button';
import MoreMenu from './more.jsx';
import './index.css';
import home_top from '@/static/images/home_top.jpg';
import home_banner from '@/static/images/home_banner.jpg';

// 加载本地语言包
import(/* webpackChunkName: intl */ './locale')
.then((intlMsg) => {
  intl.setMsg(intlMsg);
});

// 10.6.96.190:8090
var homeTopBg = {
  backgroundImage:  `url(${home_top})`
}

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
    selectedId: ''
  }

  componentDidMount () {
    this.getInfo();
    this.$store.dispatch({
      type: 'clearOldtabValue',
      payload: true
    });
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
  /*常用的菜单 element*/
  commonMenu () {
    return (
      <div className="home-menu">
        <div className="flex-row">
          <div className="flex-col-1">
            <Access PATH="manage/overview">
                <Link to="/manage/overview">
                    <MenuButton iconName="project" text="项目质量" bgName="leftBottom"/>
                </Link>
            </Access>
          </div>
          <div className="flex-col-1">
            <Access PATH="manage/aftermarket">
                <Link to="/manage/aftermarket">
                    <MenuButton iconName="after-sale" text="售后质量" bgName="leftBottom"/>
                </Link>
            </Access>
          </div>
          <div className="flex-col-1">
            <Link to="/manage/report">
              <MenuButton iconName="monthly" text="质量月报" bgName="leftBottom"/>
            </Link>
          </div>
          <div className="flex-col-1">
            <Link to="/notice">
              <MenuButton iconName="notice2" text="通知中心" bgName="leftBottom"/>
            </Link>
          </div>
        </div>
        <div className="flex-row">
          <div className="flex-col-1">
            <Link to="/todo">
              <MenuButton iconName="msg" text="待办事项"/>
            </Link>
          </div>
          <div className="flex-col-1">
            <Link to="/" onClick={() => Toast.info('II期发布,敬请期待')}>
              <MenuButton iconName="department" text="部门质量" />
            </Link>
          </div>
          <div className="flex-col-1">
            <Link to="/" onClick={() => Toast.info('II期发布,敬请期待')}>
              <MenuButton iconName="person" text="EQR评审" />
            </Link>
          </div>
          <div className="flex-col-1" onClick={() => this.setState({showMore: true})}>
              <MenuButton iconName="function" text="更多功能"/>
          </div>
        </div>
      </div>
    )
  }
  /* change身份 */
  changeId (id) {
    this.state.personalInfo.some((info) => {
      if (info.DEPT_ID === id) {
        this.setState({
          selectedId: info
        });
        return true;
      }
      return false;
    });
  }
  render () {
    
    var {selectedId, personalInfo} = this.state;
     return (
        <div className="home" style={{height: window.innerHeight}}>
          <div className="home-top" style={homeTopBg}>
          </div>
          <div className="home-banner" style={{backgroundImage: `url(${home_banner})`}}>
          </div>

          <div className="home-info">
            <div className="flex-row">
              <div className="flex-col-8">
                <div style={{paddingBottom: '10px', marginBottom: '10px'}}>
                  <span>{intl.get('job')}: </span>
                  {
                    Array.isArray(personalInfo) &&　personalInfo.map((item, i) => {
                      return (
                        <span 
                          key={i}
                          className={selectedId.DEPT_ID === item.DEPT_ID ? "post-item act" : "post-item"}
                          onClick={() => this.changeId(item.DEPT_ID)}
                        >
                          {item.POSIT_DESC}
                        </span>
                      )
                    })
                  }
                </div>
                <div>
                  <span>{intl.get('department')}: </span>
                  <span>{selectedId.DEPT_CHN_DESC}</span>
                </div>
              </div>
              <div className="flex-col-2">
                <div className="icon-wrap" onClick={() => this.context.setLanguage('en')}>
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
