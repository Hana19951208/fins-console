import request from '@/utils/request'

export const loginByUsername = ( userCode, password, channel ) => {
  const data = {
    userCode,
    password,
    channel
  }
  return request( {
    url: '/user/login',
    method: 'post',
    data
  } )
}

// 修改密码
export const updateUserPwd = data => {
  return request( {
    url: '/user/updatePassword',
    method: 'post',
    data
  } )
}

export const logout = () => {
  return request( {
    url: '/user/logout',
    method: 'post'
  } )
}

export const getUserInfo = data => {
  return request( {
    url: '/admin/user/getUserInfoByToken',
    method: 'post',
    data
  } )
}

export const homeMenu = data => {
  return request( {
    // url: '/admin/user/menuTree',
    url: '/sysMenu/getAll',
    method: 'post',
    data
  } )
}

export const chkApp = data => {
  return request( {
    url: '/user/chkApp',
    method: 'post',
    data
  } )
}