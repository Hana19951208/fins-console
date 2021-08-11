import Cookies from 'js-cookie'

const TokenKey = 'IFLYTEK_CSRFTOKEN'
const PLATFORM = 'changsha_console'

export function getToken() {
  return Cookies.get(`${PLATFORM}_${TokenKey}`)
}

export function setToken(token) {
  return Cookies.set(`${PLATFORM}_${TokenKey}`, token)
}

export function removeToken() {
  return Cookies.remove(`${PLATFORM}_${TokenKey}`)
}

export function getName() {
  return Cookies.get(`${PLATFORM}_name`)
}

export function setName(name) {
  return Cookies.set(`${PLATFORM}_name`, name)
}

export function removeName() {
  return Cookies.remove(`${PLATFORM}_name`)
}
