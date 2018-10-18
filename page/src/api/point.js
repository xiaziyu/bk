import request from '@/utils/request'
import store from '@/store';

// 获取积分管理列表
export function getList(data) {
  return request({
    url: store.getters.api_url+'App/BkPointManage/GetPointList',
    method: 'post',
    data
  })
}
// 编辑用户信息
export function userEdit(data) {
  return request({
    url: store.getters.api_url+'App/BkPointManage/ModifyInfo',
    method: 'post',
    data
  })
}