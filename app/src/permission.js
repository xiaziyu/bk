import { router } from './router';
import store from './store'
import { isOpen } from '@/utils/index'
import { totFailD } from '@/utils/notice'

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  if(isOpen()){
    if(whiteList.includes(to.name)){
      next()
    }else {
      // if(store.getters.token){
        const title = to.meta && to.meta.title
        if (title) {
          document.title = title
        }
        next()
      // }else {
      //   next({ name: 'login' })
      // }
    }
    /*if(to.name==='login'){
      const token = to.query['token']
      if(token){
        // alert(to)
        store.dispatch('setCode',{token} ).then(() => {
          page_next(to, next)
        })
      }else {
        store.dispatch('jumpUrl').then(url => {
          location.href = url
        })
      }
    }else {
      page_next(to, next)
    }*/
  }else {
    totFailD('请在微信或京东中打开')
  }
});