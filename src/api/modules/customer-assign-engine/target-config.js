import request from '@/utils/request'

// 查询
export const findByPage = (data) => {
  return request({
    url: '/allotKpi/findByPage',
    method: 'post',
    data
  })
}

// 新增
export const save = (data) => {
  return request({
    url: '/allotKpi/save',
    method: 'post',
    data
  })
}

// 修改
export const update = (data) => {
  return request({
    url: '/allotKpi/update',
    method: 'post',
    data
  })
}

// 删除
export const deleteTarget = (data) => {
  return request({
    url: '/allotKpi/delete',
    method: 'post',
    data
  })
}

// 下线
export const undAllotKPI = (data) => {
  return request({
    url: '/allotKpi/undAllotKPI',
    method: 'post',
    data
  })
}

// 发布
export const pubAllotKPI = (data) => {
  return request({
    url: '/allotKpi/pubAllotKPI',
    method: 'post',
    data
  })
}


// 是否可以下线
export const hasKpi = (data) => {
  return request({
    url: '/allotFlow/hasKpi',
    method: 'get',
    data
  })
}

// 详情
export const findById = (data) => {
  return request({
    url: `/allotKpi/findById`,
    method: 'get',
    data
  })
}

// 流程图保存
export const updateAllotFlow = (data) => {
  return request({
    url: '/allotKpi/updateAllotFlow',
    method: 'post',
    data
  })
}
