import request from '@/utils/request'
import store from '@/store';

// 登陆
export function loginByUsername(data) {
  return request({
    url: store.getters.api_url+'App/BkLogin/Login',
    method: 'post',
    data
  })
}
// 登出
export function logout(data) {
  return request({
    url: store.getters.api_url+'App/BkLogin/Logout',
    method: 'post',
    data
  })
}