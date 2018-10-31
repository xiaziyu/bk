import Cookies from 'js-cookie'

const TokenKey = 'jdxyst-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
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
