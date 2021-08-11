import request from '@/utils/request'

// 申请情况
export const getQdtApplyInfo = data => {
  return request( {
    url: '/qdtIndex/getQdtApplyInfo',
    method: 'post',
    data
  } )
}

// 申请趋势
export const getQdtTrendInfo = data => {
  return request( {
    url: '/qdtIndex/getQdtTrendInfo',
    method: 'post',
    data
  } )
}

// 平台放款量排行
export const getQdtFkInfo = data => {
  return request( {
    url: '/qdtIndex/getQdtFkInfo',
    method: 'post',
    data
  } )
}

// 首页提醒
export const getRemind = data => {
  return request( {
    url: '/homePage/getRemind',
    method: 'post',
    data
  } )
}

// 首页趋势图
export const getTrendChart = data => {
  return request( {
    url: '/homePage/getTrendChart',
    method: 'post',
    data
  } )
}

// 便捷搜索
export const getSearch = data => {
  return request( {
    url: '/homePage/getSearch',
    method: 'post',
    data
  } )
}