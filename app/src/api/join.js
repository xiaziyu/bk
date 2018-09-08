import request from '@/utils/request'
import store from "@/store";

// 获取用户报名信息
export function getJoinInfo(data) {
  return request({
    url: store.getters.api_url+'App/accounts/login',
    method: 'post',
    data
  })
}
// 获取用户token
export function getToken(data) {
  return request({
    url: store.getters.api_url+'App/Auth/getToken',
    method: 'post',
    data
  })
}