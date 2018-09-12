import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    name: 'login',
    meta: {title: '登陆'},
    component: () => import('./view/login')
  },
  {
    name: 'join',
    meta: {title: '报名表'},
    component: () => import('./view/join')
  },
  {
    name: 'auth',
    path: '/auth/*',
    meta: {title: '认证'},
    component: () => import('./view/auth')
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
