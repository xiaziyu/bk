import { router } from '@/router/index';
import store from './store'
import { IsWap, isOpen } from '@/utils/index'
import { totFailD } from '@/utils/notice'

const whiteList = ['login']

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
    totFailD('请在微信或京东金融中打开')
  }
});