import { router } from './router';
import store from './store'
import { isOpen } from '@/utils/index'
import { totFailD } from '@/utils/notice'
function page_next(to,next) {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
}
router.beforeEach((to, from, next) => {
  // console.log(name)
  if(isOpen()){
    if(store.getters.token){
      page_next(to, next)
    }else {
      store.dispatch('jumpUrl').then(url => {
        location.href = url
      })
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