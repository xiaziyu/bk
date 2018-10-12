import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/viewAdmin/layout/index'
export const _import = file => () => import('@/viewAdmin/' + file)

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/admin/login',
    hidden: true
  },
  {
    path: '/',
    redirect: '/admin/point/index',
    hidden: true
  },
  {
    name: 'login',
    path: '/admin/login',
    hidden: true,
    meta: {title: '登陆'},
    component: _import('login/index')
  },
  {
    name: 'point',
    path: '/admin/point',
    meta: {title: '积分管理'},
    component: Layout,
    children: [
      {path: 'index', name:'pointUser', component: _import('point/index')}
    ]
  },
  {
    name: 'logs',
    path: '/admin/logs',
    meta: {title: '操作历史'},
    component: Layout,
    children: [
      {path: 'index', name:'logsHandle', component: _import('logs/index')}
    ]
  }
];


const router = new Router({
  //mode: 'history', //后端支持可开
  routes
});

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  if(whiteList.includes(to.name)){
    next()
  }else {
    const title = to.meta && to.meta.title
    if (title) {
      document.title = title
    }
    next()
  }
});


export {
  router
};
