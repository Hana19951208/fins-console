import axios from 'axios'
import Qs from 'qs'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import {
  deepClone,
} from '@/utils'

// create an axios instance
const service = axios.create({
  timeout: 60000, // request timeout
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8'
  },
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['token'] = getToken()
    }
    config.url = process.env.PREFIX_URL + config.url
    let data = config.data || {}
    if (config.data) {
      data = deepClone(config.data)
    }
    if (config.noPacket) {
      config.data = Qs.stringify(data)
    } else {
      config.method === 'post' ? config.data = data : config.params = data
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.errCode != -1) {
      if (res.errCode == '400003' || res.errCode == '400008' || res.errCode == '400009') {
        MessageBox.alert('你已被登出，请尝试重新登录', '提示', {
          confirmButtonText: '重新登录',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => { // token失效时调用前端退出接口
            location.reload()
          })
        })
      } else if (res.errCode === 'C2003') {
        MessageBox.alert(res.errMsg, '重复提示', {
          confirmButtonText: '我知道了',
          type: 'warning'
        })
      } else {
        Message({
          dangerouslyUseHTMLString: true,
          message: res.errMsg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      return Promise.resolve(res.data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
