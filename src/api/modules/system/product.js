import request from '@/utils/request'

// 列表
export const findByPage = ( data ) => {
  return request( {
    url: '/sysProduct/findByPage',
    method: 'post',
    data
  } )
}

// 新增
export const addProduct = ( data ) => {
  return request( {
    url: '/sysProduct/save',
    method: 'post',
    data
  } )
}

// 编辑
export const updateProduct = ( data ) => {
  return request( {
    url: '/sysProduct/update',
    method: 'post',
    data
  } )
}

// 编辑
export const findById = ( data ) => {
  return request( {
    url: '/sysProduct/findById',
    method: 'get',
    data
  } )
}

// 删除
export const deleteProduct = ( data ) => {
  return request( {
    url: '/sysProduct/delete',
    method: 'post',
    data
  } )
}

// 启用停用
export const inUse = ( data ) => {
  return request( {
    url: '/sysProduct/inUse',
    method: 'post',
    data
  } )
}