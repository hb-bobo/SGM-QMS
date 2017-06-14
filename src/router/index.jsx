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
  ProjectQuality,
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
  { path: '/',
    component: HomePage
  },
  { path: '/project-quality',
    component: ProjectQuality
  },
  { 
    path: '/issue-advance',
    exact: false,
    component: require('@/views/issue-advance/common-advance').default,
    routes: [
      {
        path: '/issue-advance/work-plan-eidt',
        component: require('@/views/issue-advance/work-plan-eidt').default,
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
  if (route.path === '/') {
    isExact = true;
  }
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
