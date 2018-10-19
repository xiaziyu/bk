import Vue from 'vue'

export function totText(text) {
  Vue.prototype.$toast({
    duration: 5*1000, //显示时间
    message: text
  })
}
export function totFail(text) {
  Vue.prototype.$toast.fail({
    duration: 5*1000, // 显示时间
    forbidClick: true, // 禁用背景点击
    message: text
  })
}

export function totFailD(text) {
  Vue.prototype.$toast.fail({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    message: text
  })
}

export function totSuc(text) {
  Vue.prototype.$toast.success({
    duration: 5*1000, //显示时间
    message: text
  })
}
export function totSucD(text) {
  Vue.prototype.$toast.success({
    duration: 0, //始终显示
    message: text
  })
}
export function allLoad() {
  Vue.prototype.$toast.loading({
    duration: 0,
    forbidClick: true,
    mask: true,
    message: '加载中...'
  })
}
