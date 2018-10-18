import Vue from 'vue'

export function megSuc(text) {
  Vue.prototype.$message({
    showClose: true,
    type: 'success',
    message: text,
    duration: 10 * 1000
  })
}
export function megError(text) {
  Vue.prototype.$message({
    showClose: true,
    type: 'error',
    message: text,
    duration: 10 * 1000
  })
}