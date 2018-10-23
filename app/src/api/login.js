import request from '@/utils/request'
import store from '@/store';

// 获取用户Pin
export function getPin(data) {
  return request({
    url: store.getters.api_url+'App/Auth/getPin',
    isfull: true,
    method: 'post',
    data
  })
}
// 京东获取token
export function getIsvToken(data) {
  return request({
    url: store.getters.api_url+'App/Auth/getISVToken',
    isfull: true,
    method: 'post',
    data
  })
}