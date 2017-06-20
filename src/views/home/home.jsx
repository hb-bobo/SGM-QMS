import * as React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

class HomePage extends React.Component{

  render () {
     return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z1 bg-darken-3">
          <div>
            Home
          </div>
          <RaisedButton>
            <Link to="/EQRHotIssue">EQR热点</Link>
          </RaisedButton>
          <RaisedButton>
            <Link to="/manage/project-quality">项目质量</Link>
          </RaisedButton>
          <RaisedButton>
            <Link to="/manage/quality-month-report">质量月报(缩放版)</Link>
          </RaisedButton>
          <RaisedButton>
            <Link to="/manage/quality-month-report1">质量月报(点击全屏缩放版)</Link>
          </RaisedButton>
        </div>
    );
  }
}

export default HomePage
