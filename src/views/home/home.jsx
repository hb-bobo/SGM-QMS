import * as React from 'react';
import PropTypes from 'prop-types';
import { getListData } from '@/store/actions';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import intl from '@/components/intl';
import { POST } from '@/plugins/fetch';
import MenuButton from './menu-button';
import MoreMenu from './more.jsx';
import './index.css';
import home_top from '@/static/images/home_top.jpg';
import home_banner from '@/static/images/home_banner.jpg';

// 10.6.96.190:8090
var homeTopBg = {
  backgroundImage:  `url(${home_top})`
}
class HomePage extends React.Component{
  static contextTypes = {
    language: PropTypes.string,
    setLanguage: PropTypes.func,
    router: PropTypes.object,
    store: PropTypes.object
  }
  state = {
    showMore: false
  }
  componentWillMount () {
    console.log(this)
    var Home = this;
    this.$store.dispatch(getListData({
      a:1
    }));
    // 取用户名
    document.addEventListener('plusready', function () {
      var fhname = window.NativeObj.getUserName()
      if (!fhname) {
        alert('获取用户名失败')
      }
      if (
        fhname === null ||
        fhname === undefined ||
        fhname === '') {
        window.location.href = 'views/error/403.html'
      } else {
        /* window.$ajax({
          type: 'POST',
          url: 'enter.do',
          data: 'userName=' + fhname,
          success: function (data) {
            if (!data.success) {
              window.location.href = 'views/error/403.html'
            }
          }
        }); */
        
        POST('enter.do', {
            data: 'userName=' + fhname,
        })
        .then((res) => {
          if (!res.success) {
            Home.context.router.history.push('/404');
          }
        })
      }
    }, false);
  }
  componentDidMount () {
  }
  /*常用的菜单 element*/
  commonMenu () {
    return (
      <div className="home-menu">
        <div className="flex-row">
          <div className="flex-col-1">
            <Link to="/manage/overview">
              <MenuButton iconName="project" text="项目质量" bgName="leftBottom"/>
            </Link>
          </div>
          <div className="flex-col-1">
            <Link to="/manage/quality-after-sale">
              <MenuButton iconName="after-sale" text="售后质量" bgName="leftBottom"/>
            </Link>
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
            <Link to="/">
              <MenuButton iconName="department" text="部门质量"/>
            </Link>
          </div>
          <div className="flex-col-1">
            <Link to="/">
              <MenuButton iconName="person" text="EQR评审"/>
            </Link>
          </div>
          <div className="flex-col-1" onClick={() => this.setState({showMore: true})}>
              <MenuButton iconName="function" text="更多功能"/>
          </div>
        </div>
      </div>
    )
  }
  render () {
    intl.setMsg(require('./locale'));
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
                  <span>工程师</span>
                </div>
                <div>
                  <span>{intl.get('department')}: </span>
                  <span>EQDs</span>
                </div>
              </div>
              <div className="flex-col-2">
                <div className="icon-wrap" onClick={() => this.context.setLanguage('zh')}>
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
