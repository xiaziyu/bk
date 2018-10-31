import store from "@/store";

// 获取地址栏信息
export function getUrlKey(name){
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
 export function IsWap() {
   const userAgentInfo = navigator.userAgent.toLowerCase()
   const Agents = new Array('android', 'iphone', 'symbianos', 'windows phone', 'windows mobile', 'ipad', 'iPod', 'windows ce', 'ucweb', 'midp')
   const flag = Agents.some(item => {
     return userAgentInfo.includes(item)
   })
   return flag
 }
 /*export function isOpen() {
   const ua = navigator.userAgent.toLowerCase()
   const isWeixin = ua.includes('micromessenger')
   const ux = isWeixin?'WX':'JD'
   const isAndroid = ua.includes('android') || ua.includes('adr')
   const isiOS = !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)
   const client = isAndroid?'android':isiOS?'ios':false
   store.dispatch('changeClient', client)
   store.dispatch('changeSource',ux)
   return ux!==''&&client
 }*/
