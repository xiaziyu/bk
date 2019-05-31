import { router } from '@/router/index';
import store from './store'
import { IsWap } from '@/utils/index'
import { totFailD } from '@/utils/notice'
import ba from 'vue-ba'

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  if(IsWap()){
    if(whiteList.includes(to.name)){
      next()
    }else {
      if(store.getters.openid){
        const title = to.meta && to.meta.title
        if (title) {
          document.title = title
        }
        store.dispatch('getJdToken')
        next()
        ba.trackPageview(to.fullPath)
      }else {
        next({ name: 'login' })
      }
    }
  }else {
    totFailD('请在手机中打开')
  }
});

/*
router.beforeEach((to, from, next) => {
  if(IsWap()&&isOpen()){
    if(whiteList.includes(to.name)){
      next()
    }else {
      if(store.getters.token&&store.getters.pin){
        const title = to.meta && to.meta.title
        if (title) {
          document.title = title
        }
        next()
      }else {
        next({ name: 'login' })
      }
    }
  }else {
    totFailD('请在手机中打开')
  }
});*/
