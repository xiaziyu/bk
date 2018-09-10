import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import { getUrlKey } from '@/utils/index'

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/h5/join'
  },
  // {
  //   path: '/*',
  //   redirect: '/join'
  // },
  {
    name: 'join',
    meta: {title: '报名表'},
    component: () => import('./view/join')
  },
  {
    name: 'auth',
    // path: '/auth/*',
    meta: {title: '认证'},
    component: () => import('./view/auth')
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/h5/' + (route.name || '')
});

const router = new Router({
  mode: 'history', //后端支持可开
  routes
});

router.beforeEach((to, from, next) => {
  //console.log(to)
  if(to.name==='join'){
    const [codes, states] = [to.query['code'], to.query['state']]
    //console.log(codes,token)
    if(codes&&states){
      store.dispatch('setCode',{codes, states} ).then(() => {
        next()
        // if(token){
        //   next()
        // }else {
        //   store.dispatch('tokenUrl').then(url => {
        //     console.log(url)
        //     location.href = url
        //   })
        // }
      })
    }else {
      store.dispatch('jumpUrl').then(url => {
        console.log(url)
        location.href = url
      })
    }
  }else {
    console.log(to)
    next()
  }
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
});

export {
  router
};
