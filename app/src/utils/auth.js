import Cookies from 'js-cookie'

const CodeKey = 'jdxyst-code'

export function getCode() {
  return Cookies.get(CodeKey)
}

export function setCode(token) {
  return Cookies.set(CodeKey, token)
}

export function removeCode() {
  return Cookies.remove(CodeKey)
}

const OpenidKey = 'jdxyst-openid'

export function getOpenid() {
  return Cookies.get(OpenidKey)
}

export function setOpenid(openid) {
  return Cookies.set(OpenidKey, openid)
}

export function removeOpenid() {
  return Cookies.remove(OpenidKey)
}
