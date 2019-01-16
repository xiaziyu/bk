import { router } from '@/router/index';
import store from './store'

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  if(whiteList.includes(to.name)){
    next()
  }else {
    if(store.getters.name){
      next()
    }else {
      next({ name: 'login' })
    }
  }
});