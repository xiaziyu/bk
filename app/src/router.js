import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import { getUrlKey } from '@/utils/index'

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/join'
  },
  {
    name: 'join',
    component: () => import('./view/join'),
    meta: {
      title: '报名表'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  mode: 'history', //后端支持可开
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  const code = getUrlKey('code')
  if(code){
    store.dispatch('setCode',code).then(() => {
      next();
    })
  }else {
    store.dispatch('jumpUrl').then(url => {
      console.log(url)
      // location.href = url
    })
  }
});

export {
  router
};
