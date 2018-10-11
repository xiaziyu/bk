import request from '@/utils/request'
import store from "@/store"
// 积分信息
export function getPoint(data) {
  return request({
    url: store.getters.api_url+'App/Main/GetPointInfo',
    method: 'post',
    data
  })
}
// 积分互通
export function changePoint(data) {
  return request({
    url: store.getters.api_url+'App/Main/exchangePoint',
    method: 'post',
    data
  })
}
// 热门礼品
export function getGift(data) {
  return request({
    url: store.getters.api_url+'App/Main/getHotGiftList',
    method: 'post',
    data
  })
}
// 任务列表
export function getTask(data) {
  return request({
    url: store.getters.api_url+'App/Main/getMissionsList',
    method: 'post',
    data
  })
}