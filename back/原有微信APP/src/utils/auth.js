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

/*const PinKey = 'jdxyst-pin'

export function getPin() {
  return Cookies.get(PinKey)
}

export function setPin(pin) {
  return Cookies.set(PinKey, pin)
}

export function removePin() {
  return Cookies.remove(PinKey)
}*/

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
