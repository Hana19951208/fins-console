import 'babel-polyfill'
import Vue from 'vue'

import Cookies from 'js-cookie'
import 'hover.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/createApi/modal' // 引用createApi
import '@/styles/font/iconfont.css'
import '@/styles/font/libs/iconfont.css'
import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import api from './api'
import * as filters from './filters' // global filters
import VueScrollTo from 'vue-scrollto'
import ECharts from 'vue-echarts'
import _ from 'lodash'
import moment from 'moment'
Vue.prototype.$moment = moment
Vue.prototype._ = _
import button from './directive/button'

Vue.component('v-chart', ECharts)
Vue.use(button)

Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(VueScrollTo, {
  container: '.el-main'
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(api)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
