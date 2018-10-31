import Vue from 'vue'
import Router from 'vue-router'

// export const _import = file => () => import('@/view/' + file)
export const _import = file => resolve => require(['@/view/' + file + '.vue'], resolve)


Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    name: 'login',
    meta: {title: '登陆'},
    component: _import('login/index')
  },
  {
    name: 'join',
    meta: {title: '报名表'},
    component: _import('join/index')
  },
  {
    name: 'point',
    meta: {title: '别克积分'},
    component: _import('point/index')
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
});

const router = new Router({
  mode: 'history', //后端支持可开
  routes
});

export {
  router
};
