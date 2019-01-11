import { router } from '@/router/index';
import store from './store'
// import ba from 'vue-ba'

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  if(whiteList.includes(to.name)){
    next()
  }else {
    if(store.getters.name){
      next()
      // ba.trackPageview(to.fullPath)
    }else {
      next({ name: 'login' })
    }
  }
});