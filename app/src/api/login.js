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
/*
 * 京东新文档
*/
//京东新文档获取token及openid
export function getOpenid(data) {
  return request({
    url: store.getters.api_url+'App/Auth/getOpenid',
    isfull: true,
    method: 'post',
    data
  })
}
// 京东获取token
export function getToken(data) {
  return request({
    url: store.getters.api_url+'App/Auth/getToken',
    isfull: true,
    method: 'post',
    data
  })
}