import request from '@/utils/request'

export const findByPage = data => {
  return request( {
    url: '/sysMktUser/findByPage',
    method: 'post',
    data
  } )
}

export const saveMktUser = data => {
  return request( {
    url: '/sysMktUser/save',
    method: 'post',
    data
  } )
}

export const updateMktUser = data => {
  return request( {
    url: '/sysMktUser/update',
    method: 'post',
    data
  } )
}

export const deleteMktUser = data => {
  return request( {
    url: '/sysMktUser/delete',
    method: 'post',
    data
  } )
}

export const updateImg = data => {
  return request( {
    url: '/sysMktUser/updateImg',
    method: 'post',
    data
  } )
}


export const getMktUserDetail = data => {
  return request({
    url: '/sysMktUser/findById',
    method: 'get',
    data
  })
}