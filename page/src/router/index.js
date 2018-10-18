import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/view/layout/index'
// export const _import = file => () => import('@/view/' + file)
export const _import = file => resolve => require(['@/view/' + file + '.vue'], resolve)

Vue.use(Router)
const autoRoutes = [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/',
    redirect: '/point/index',
    hidden: true
  },
  {
    name: '404',
    path: '/404',
    hidden: true,
    meta: {title: '找不到页面'},
    component: _import('errorPage/404')
  },
  {
    name: 'login',
    path: '/login',
    hidden: true,
    meta: {title: '登陆'},
    component: _import('login/index')
  }
]
const routes = [
  {
    name: 'point',
    path: '/point',
    meta: {title: '积分管理', icon: 'm-point'},
    component: Layout,
    children: [
      {path: 'index', name:'pointUser', component: _import('point/index'), meta: {title: '积分管理', icon: 'm-point'}}
    ]
  },
  {
    name: 'logs',
    path: '/logs',
    meta: {title: '操作历史', icon: 'm-log'},
    component: Layout,
    children: [
      {path: 'index', name:'logsHandle', component: _import('logs/index'),meta: {title: '操作历史', icon: 'm-log'}}
    ]
  }
];

export const routerMap = [ ...autoRoutes, ...routes]
const router = new Router({
  //mode: 'history', //后端支持可开
  routes: routerMap
});

export {
  router
};
