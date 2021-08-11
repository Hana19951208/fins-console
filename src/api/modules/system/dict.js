import request from '@/utils/request'

// 查询字典树（全量）
export const getDictTree = ( data ) => {
  return request( {
    url: '/sysDict/getDictTree',
    method: 'post',
    data
  } )
}

// 查询字典项
export const getDictItems = ( data ) => {
  return request( {
    url: '/sysDict/getDictItems',
    method: 'get',
    data
  } )
}

// 新增字典项
export const saveDict = ( data ) => {
  return request( {
    url: '/sysDict/save',
    method: 'post',
    data
  } )
}

// 删除字典项
export const deleteDict = ( data ) => {
  return request( {
    url: '/sysDict/delete',
    method: 'post',
    data
  } )
}

// 编辑字典项
export const updateDict = ( data ) => {
  return request( {
    url: '/sysDict/update',
    method: 'post',
    data
  } )
}

// 查询所有字典项
export const getAllDictTypeAndEntry = ( data ) => {
  return request( {
    url: '/sysDict/getAllDictItems',
    method: 'get',
    data
  } )
}