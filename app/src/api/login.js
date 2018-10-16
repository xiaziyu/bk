import request from '@/utils/request'
import store from '@/store';

// 获取用户token
export function getToken(data) {
  return request({
    url: store.getters.api_url+'App/Auth/getToken',
    method: 'post',
    data
  })
}
// 获取用户Pin
export function getPin(data) {
  return request({
    url: store.getters.api_url+'App/Auth/getPin',
    method: 'post',
    data
  })
}
