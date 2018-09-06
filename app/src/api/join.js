import request from '@/utils/request'

// 获取用户信息
export function getUserInfo(data) {
  return request({
    url: 'App/accounts/login',
    method: 'post',
    data
  })
}
