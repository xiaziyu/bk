import axios from 'axios'
import { megError } from '@/utils/notice'
import { router } from '@/router/index';
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api的base_url
  baseURL: process.env.NODE_ENV === 'production' ? '/' : '/api/', // api的base_url
  timeout: 10000, // 请求超时时间
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
})
// request拦截器
service.interceptors.request.use(config => {
  if (config.method === 'post'&&config.headers['Content-Type']!=='multipart/form-data') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * ret为非200是抛错
     */
    const res = response.data
    if (res['ret']&&Number(res['ret']) === 200){
      return response.data
    }else {
      if (Number(res['ret']) === 666) {
        router.push({ name: 'login' })
      }
      const text = res['msg']?res['msg']:'返回异常，请稍候重试'
      megError(text)
      return Promise.reject('error')
    }
  },
  error => {
    console.log(error.response)// for debug
    megError('网络异常，请稍候重试')
    return Promise.reject(error)
  }
)
export default service
