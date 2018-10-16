import request from '@/utils/request'
import store from '@/store';

// 获取积分管理列表
export function getList(data) {
  return request({
    url: store.getters.api_url+'App/Auth/getToken',
    method: 'post',
    data
  })
}
