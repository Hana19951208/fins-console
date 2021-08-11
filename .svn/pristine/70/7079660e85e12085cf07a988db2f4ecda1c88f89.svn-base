import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { setItem, getItem } from '@/utils/storage'
import { getToken, getName } from '@/utils/auth' // getToken from cookie

NProgress.configure( { showSpinner: false } ) // NProgress Configuration

const whiteList = [ '/login', '/auth-redirect' ] // no redirect whitelist

router.beforeEach( ( to, from, next ) => {
  NProgress.start() // start progress bar
  if ( getToken() ) {
    // determine if there has token
    /* has token*/
    if ( to.path === '/startUp' ) {
      next()
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if ( !store.getters.appId ) {
        next( { path: '/startUp' } )
        NProgress.done()
      } else {
        if ( !store.getters.name ) {
          // console.log( store.getters.name )
          // store.commit('SET_NAME', getItem('name'))
          // store中未初始化name，用户登录加载菜单成功后，重新赋值name
          store.commit( 'SET_NAME', getName() )
          const user = typeof store.getters.user == "string" ? JSON.parse( store.getters.user ) : store.getters.user || {}
          store.dispatch( 'GenerateRoutes', { menuChannel: 'PC', roleId: user.roleId, appsId: store.getters.appId, isCheck: 1 } ).then( () => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes( store.getters.addRouters ) // 动态添加可访问路由表
            // console.log(store.getters.addRouters)
            store.dispatch( 'GenerateDicts', {} )
            next( { ...to, replace: true } ) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            NProgress.done()
          } )
        } else {
          next()
        }
      }

    }
  } else {
    /* has no token*/
    if ( whiteList.indexOf( to.path ) !== -1 ) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next( `/login?redirect=${to.path}` ) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
} )

router.afterEach( () => {
  NProgress.done() // finish progress bar
} )