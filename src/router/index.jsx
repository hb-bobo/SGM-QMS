import * as React from 'react';
//Redirect Switch
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import { CSSTransitionGroup } from 'react-transition-group';
import asyncComponet from '@/components/asyncComponet';

/**
 * import() 方法返回一个Promise
 * import(注释为chunkName + 路径) chunkName： 一个模块的子模块chunkName都与大模块一样；
 */

export const routes = [
  {
    path: '/toLogin',
    component: asyncComponet(() => import(/* webpackChunkName: "status" */ '@/views/status/toLogin'))
  },
  {
    path: '/404',
    component: asyncComponet(() => import(/* webpackChunkName: "status" */ '@/views/status/404'))
  },
  {
    path: '/403',
    component: asyncComponet(() => import(/* webpackChunkName: "status" */ '@/views/status/403'))
  },
  { 
    path: '/',
    exact: true, // HomePage
    component: asyncComponet(() => import(/* webpackChunkName: "home" */ '@/views/home'))
  },
  // {
  //   path: '/test',
  //   component: require('@/views/home/home').TodoList
  // },
  
  {
    path: '/manage',
    component: asyncComponet(() => import(/* webpackChunkName: "Manage" */ '@/views/manage')),
    routes: [
      {
        path: '/manage/report',
        component: asyncComponet(() => import(/* webpackChunkName: "Manage" */ '@/views/manage/report'))
      },
      {
        path: '/manage/aftermarket',
        component: asyncComponet(() => import(/* webpackChunkName: "Manage" */ '@/views/manage/aftermarket'))
      },
      {
        path: '/manage/overview',
        component: asyncComponet(() => import(/* webpackChunkName: "Manage" */ '@/views/manage/overview'))
      }
    ]
  },
  
  {
    path: '/search',
    component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search')),
    routes: [
        { 
          path: '/search/issue-advance',
          exact: false,
          component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/issue-advance')), 
          routes: [
            {
              path: '/search/issue-advance/PRTS',
              component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/issue-advance/advanceType/PRTS-issue-advance'))
            },
            {
              path: '/search/issue-advance/QDCPIR',
              component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/issue-advance/advanceType/QDCPIR-issue-advance'))
            },
            {
              path: '/search/issue-advance/EIR',
              component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/issue-advance/advanceType/EIR-issue-advance'))
            },
            {
              path: '/search/issue-advance/SIL',
              component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/issue-advance/advanceType/SIL-issue-advance'))
            },
            {
              path: '/search/issue-advance/Readacross',
              component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/issue-advance/advanceType/Readacross-issue-advance'))
            },
            {
              path: '/search/issue-advance/VE',
              component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/issue-advance/advanceType/VE-issue-advance'))
            },
            {
              path: '/search/issue-advance/VOC',
              component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/issue-advance/advanceType/VOC-issue-advance'))
            },
            {
              name: 'work-plan-edit',
              path: '/search/issue-advance/work-plan-edit/:id',
              component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/issue-advance/work-plan-edit'))
            },
          ]
        },
        {
          path: '/search/assist',
          component: asyncComponet(() => import(/* webpackChunkName: "Search" */ '@/views/search/assist'))
        }
    ]
  },

  {
    path: '/project',
    component: asyncComponet(() => import(/* webpackChunkName: "Project" */ '@/views/project')),
    routes: [
      {
        path: '/project/verification/:subProjectId',
        component: asyncComponet(() => import(/* webpackChunkName: "Project" */ '@/views/project/verification'))
      },
      // {
      //   path: '/project/overview',
      //   component: asyncComponet(() => import(/* webpackChunkName: "Project" */ '@/views/project/overview'))
      // },
      {
        path: '/project/EQRHotIssue',
        component: asyncComponet(() => import(/* webpackChunkName: "Project" */ '@/views/project/EQRHotIssue'))
      }
    ]
  },
  {
    path: '/notice',
    component: asyncComponet(() => import(/* webpackChunkName: "Notice" */ '@/views/notice'))
  },
  {
    path: '/todo',
    component: asyncComponet(() => import(/* webpackChunkName: "Todo" */ '@/views/todo'))
  },
  {
    path: '/department',
    component: asyncComponet(() => import(/* webpackChunkName: "Department" */ '@/views/department'))
  }
]


// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work

/* <ReactCSSTransitionGroup
      transitionName="example"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
</ReactCSSTransitionGroup> */
export const RouteWithSubRoutes = (route) => {
  var isExact = route.exact || false;
  // if exact = true will replace homePage
  return (
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
