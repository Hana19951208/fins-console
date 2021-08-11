import request from '@/utils/request'

// 列表
export const findByPage = ( data ) => {
  return request( {
    url: '/sysApps/findByPage',
    method: 'post',
    data
  } )
}

// 新增
export const addApp = ( data ) => {
  return request( {
    url: '/sysApps/save',
    method: 'post',
    data
  } )
}

// 编辑
export const updateApp = ( data ) => {
  return request( {
    url: '/sysApps/update',
    method: 'post',
    data
  } )
}

// 详情
export const findById = ( data ) => {
  return request( {
    url: '/sysApps/findById',
    method: 'get',
    data
  } )
}

// 删除
export const deleteApp = ( data ) => {
  return request( {
    url: '/sysApps/delete',
    method: 'post',
    data
  } )
}

// 启用停用
export const inUse = ( data ) => {
  return request( {
    url: '/sysApps/inUse',
    method: 'post',
    data
  } )
}

// UUID
export const getUUID = ( data ) => {
  return request( {
    url: '/sysApps/getUUID',
    method: 'get',
    data
  } )
}