import * as React from 'react';
//Redirect
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// views
import {
  HomePage,
  Error404,
  Manage,
  QualityMonthReport,
  QualityMonthReport1,
  ProjectQuality,
  IssueAdvance,
  EQRHotIssue
} from '@/views/';
/*import {
  BasicInputExampleWrapper
} from '@/views/page1';*/
/*function getComponent (path, chunkName) {
  return r => require.ensure([], () => r(require('../views/home')), 'home-page')
}*/

export const routes = [
  {
    path: '/404',
    component: Error404
  },
  { 
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/manage',
    component: Manage,
    routes: [
      {
        path: '/manage/quality-month-report',
        component: QualityMonthReport,
      },
      {
        path: '/manage/quality-month-report1',
        component: QualityMonthReport1,
      },
      { 
        path: '/manage/project-quality',
        component: ProjectQuality
      }
    ]
  },
  { 
    path: '/issue-advance',
    exact: false,
    component: IssueAdvance,
    routes: [
      {
        path: '/issue-advance/PRTS',
        component: require('@/views/issue-advance/PRTS-issue-advance').default,
      },
      {
        name: 'work-plan-edit',
        path: '/issue-advance/work-plan-edit/:id',
        component: require('@/views/issue-advance/work-plan-edit').default,
      },
      {
        name: 'work-plan-edit',
        path: '/issue-advance/edit/:id',
        component: require('@/views/issue-advance/edit').default,
      }
    ]
  },
  { path: '/EQRHotIssue',
    component: EQRHotIssue,
    routes: [
      {
          path: '/EQRHotIssue/advance',
          exact: false,
          component: require('@/views/EQRHotIssue/advance').default
      },
      // { path: '/EQRHotIssue/Advance',
      //   component: BasicInputExampleWrapper
      // }
    ]
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = (route) => {
  var isExact = route.exact || false;
  // if exact = true will replace homePafe
  return (
    <ReactCSSTransitionGroup
      transitionName="example"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      <Route
        path={route.path}
        exact={isExact}
        render={props => (
        // pass the sub-routes down to keep nesting
          <route.component
            {...props}
            parent={route.parent}
            routes={route.routes}
          />
        )}
      />
    </ReactCSSTransitionGroup>
  )
}

const AppRouter = () => (
  <Router>
    <div>
        <div>
          {routes.map((route, i) => (
            <RouteWithSubRoutes  key={i} {...route}/>
          ))}
        </div>
    </div>
  </Router>
);
export default AppRouter;
