import * as React from 'react';
//Redirect Switch
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import { CSSTransitionGroup } from 'react-transition-group';

// views
import {
  HomePage,
  Error404,
  Error403,
  Manage,
  Project,
  Search,
  Notice,
  IssueAdvance,
  Todo
} from '@/views/';

/*import {
  BasicInputExampleWrapper
} from '@/views/page1';*/
/*function getComponent (path, chunkName) {
  return r => require.ensure([], () => r(require('../views/home')), 'home-page')
}*/
// console.log(import('@/views/manage/overview').then((res) => console.log(res.default)))

export const routes = [
  {
    path: '/404',
    component: Error404
  },
  {
    path: '/403',
    component: Error403
  },
  { 
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/test',
    component: require('@/views/home/home').TodoList
  },
  { 
    path: '/project',
    component: Project
  },
  {
    path: '/manage',
    component: Manage,
    routes: [
      {
        path: '/manage/report',
        component: require('@/views/manage/report').default,
      },
      {
        path: '/manage/aftermarket',
        component: require('@/views/manage/aftermarket').default,
      },
      {
        path: '/manage/overview',
        component: require('@/views/manage/overview').default
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    routes: [
        { 
          path: '/search/issue-advance',
          exact: false,
          component: IssueAdvance,
          routes: [
            {
              path: '/search/issue-advance/PRTS',
              component: require('@/views/search/issue-advance/advanceType/PRTS-issue-advance').default,
            },
            {
              path: '/search/issue-advance/QDCPIR',
              component: require('@/views/search/issue-advance/advanceType/QDCPIR-issue-advance').default,
            },
            {
              path: '/search/issue-advance/EIR',
              component: require('@/views/search/issue-advance/advanceType/EIR-issue-advance').default,
            },
            {
              path: '/search/issue-advance/SIL',
              component: require('@/views/search/issue-advance/advanceType/SIL-issue-advance').default,
            },
            {
              path: '/search/issue-advance/Readacross',
              component: require('@/views/search/issue-advance/advanceType/Readacross-issue-advance').default,
            },
            {
              path: '/search/issue-advance/VE',
              component: require('@/views/search/issue-advance/advanceType/VE-issue-advance').default,
            },
            {
              path: '/search/issue-advance/VOC',
              component: require('@/views/search/issue-advance/advanceType/VOC-issue-advance').default,
            },
            {
              name: 'work-plan-edit',
              path: '/search/issue-advance/work-plan-edit/:id',
              component: require('@/views/search/issue-advance/work-plan-edit').default,
            },
          ]
        },
        {
          path: '/search/assist',
          component: require('@/views/search/assist').default
        }
    ]
  },
  {
    path: '/project',
    component: Project,
    routes: [
      {
        path: '/project/verification/:subProjectId',
        component: require('@/views/project/verification').default
      },
      {
        path: '/project/overview',
        component: require('@/views/project/overview').default
      },
      {
        path: '/project/EQRHotIssue',
        component: require('@/views/project/EQRHotIssue').default
      }
    ]
  },
  {
    path: '/notice',
    component: Notice
  },
  {
    path: '/todo',
    component: Todo
  },
  {
    path: '/department',
    component: require('@/views/department/').default
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = (route) => {
  var isExact = route.exact || false;
  // if exact = true will replace homePage
  return (
    <ReactCSSTransitionGroup
      transitionName="example"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
      <Route
        path={route.path}
        exact={isExact}
        render={props => (
        // pass the sub-routes down to keep nesting
        
          <route.component
            parent={route.parent}
            routes={route.routes}
            {...props}
            
          />
        )}
      />
    </ReactCSSTransitionGroup>
  )
}

const AppRouter = (props) => (
  <Router>
    <div>
      {
        routes.map((route, i) => (
          <RouteWithSubRoutes  key={i} {...route}/>
        ))
      }
    </div>
  </Router>
);
export default AppRouter;
