import { router } from './router';
import store from './store'
import { getUrlKey, isWeixin } from '@/utils/index'
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
  if(isWeixin()){
    if(to.name==='login'){
      const [codes, states, source] = [to.query['code'], to.query['state'], '02']
      if(codes&&states){
        store.dispatch('setCode',{codes, states, source} ).then(() => {
          page_next(to, next)
        })
      }else {
        store.dispatch('jumpUrl').then(url => {
          location.href = url
        })
      }
    }else {
      page_next(to, next)
    }
  }else {
    totFailD('请在微信中打开')
  }
});