// 获取地址栏信息
export function getUrlKey(name){
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
 export function IsWap() {
   const userAgentInfo = navigator.userAgent.toLowerCase()
   const Agents = new Array('android', 'iphone', 'symbianos', 'windows phone', 'windows mobile', 'ipad', 'iPod', 'windows ce', 'ucweb', 'midp')
   let flag = Agents.some(item => {
     return userAgentInfo.includes(item)
   })
   return flag
 }