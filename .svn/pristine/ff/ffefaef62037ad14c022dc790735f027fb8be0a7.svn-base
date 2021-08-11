import vue from 'vue'
import store from '@/store'

/**
 * 全局指令-按钮权限
 * 使用方法：<el-button v-has="'btn-add'">新增</el-button>
 * 判断规则：如果用户角色存在按钮权限，显示按钮
 * @type {DirectiveOptions}
 */
const has = vue.directive('has', {
  inserted: (el, binding, vnode) => {
    let url = null
    if (vnode.context[binding.arg]) {
      url = vnode.context[binding.arg]
    }
    const btnPremissions = vnode.context.$route.meta.url || url
    // console.info(btnPremissions)
    if (
      !btnPremissions ||
      !vue.prototype.$_has(btnPremissions, binding.value)
    ) {
      el.parentNode.removeChild(el)
    }
  }
})

/**
 * 全局属性
 * @param value
 * @returns {boolean}
 */
vue.prototype.$_has = function (url, value) {
  // console.info(url)
  let isExist = false
  const buttons = store.getters.buttons[url]
  // console.info(buttons)
  if (buttons === undefined || buttons === null) {
    return false
  }
  if (!value) {
    return false
  }
  if (buttons.findIndex(el => el === value) !== -1) {
    isExist = true
  }
  return isExist
}

export default has
