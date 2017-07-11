import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import intl from '@/components/intl';
import MenuButton from './menu-button';
import './index.css';

class HomePage extends React.Component{
  static contextTypes = {
    language: PropTypes.string,
    setLanguage: PropTypes.func
  }
  
  render () {
    intl.setMsg(require('./locale'));
     return (
        <div className="home" style={{height: window.innerHeight}}>
          <div className="home-top">
          </div>
          <div className="home-banner">
          </div>
          <div className="home-info">
            <div className="flex-row">
              <div className="flex-col-8">
                <div style={{paddingBottom: '10px'}}>
                  <span>{intl.get('job')}: </span>
                  <span>工程师</span>
                </div>
                <div>
                  <span>{intl.get('department')}: </span>
                  <span>EQDs</span>
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
            home-info
          </div>
          <div className="home-menu">
            <Link to="/manage/overview">
              <MenuButton iconName="project" text="项目质量"/>
            </Link>
            <Link to="/manage/quality-after-sale">
              <MenuButton iconName="project" text="售后质量"/>
            </Link>
            <Link to="/manage/quality-month-report">
              <MenuButton iconName="project" text="质量月报"/>
            </Link>
            <Link to="/todo">
              <MenuButton iconName="project" text="待办事项"/>
            </Link>
            <Link to="/project/overview">
              <MenuButton iconName="project" text="项目质量总览"/>
            </Link>

            <Link to="/project/verification">
              <MenuButton iconName="project" text="热点问题"/>
            </Link>
            <Link to="/test">
              <MenuButton iconName="project" text="test"/>
            </Link>
            {/*<RaisedButton>
              <Link to="/manage/overview">项目质量</Link>
            </RaisedButton>
            <RaisedButton>
              <Link to="/manage/quality-after-sale">售后质量</Link>
            </RaisedButton>
            <RaisedButton>
              <Link to="/manage/quality-month-report">质量月报</Link>
            </RaisedButton>
            <RaisedButton>
              <Link to="/todo">待办事项</Link>
            </RaisedButton>
            <RaisedButton>
              <Link to="/search/assist">项目质量总览</Link>
            </RaisedButton>
            <RaisedButton>
              <Link to="/project/verification">热点问题</Link>
            </RaisedButton>
            <RaisedButton>
              <Link to="/test">test</Link>
            </RaisedButton>*/}
          {/* <RaisedButton>
              <Link to="/manage/quality-month-report1">质量月报(点击全屏缩放版)</Link>
            </RaisedButton>*/}
          </div>
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
