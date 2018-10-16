import request from '@/utils/request'
import store from '@/store';

// 用户报名
export function subJoin(data) {
  return request({
    url: store.getters.api_url+'App/Register/ModifyRegisterInfo',
    method: 'post',
    data
  })
}
