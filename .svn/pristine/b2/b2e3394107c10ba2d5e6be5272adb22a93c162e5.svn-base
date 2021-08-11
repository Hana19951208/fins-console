import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'
import {
  homeMenu
} from '@/api/login'

import _ from 'lodash'

/**
 * 判断后台返回菜单列表中路由信息，
 * 剔除用户不可访问路由
 * @param routes
 * @param roles
 * @returns {Array}
 */
function filterAsyncRouter( routes, menus ) {
  const res = []
  routes.forEach( route => {
    menus.forEach( menu => {
      if ( menu && menu.menuUrl === route.meta.url ) {
        if ( menu.children && menu.children.length > 0 ) {
          route.children = filterAsyncRouter( route.children || [], menu.children || [] )
        }
        route.btnPermissions = menu.buttonList
        route.meta.title = menu.menuName
        route.meta.theSort = menu.menuSort
        res.push( route )
      }
    } )
  } )
  let routeArray = _.sortBy( res, function ( item ) {
    return Number( item.meta.theSort )
  } );
  return routeArray
}

const permission = {
  state: {
    routers: [],
    addRouters: [],
    buttons: []
  },
  mutations: {
    SET_ROUTERS: ( state, routers ) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat( routers )
    },
    G_BUTTON_LIST: ( state, buttons ) => {
      state.buttons = buttons
    }
  },
  actions: {
    GenerateRoutes( {
      commit,
      dispatch
    }, data ) {
      return new Promise( resolve => {
        homeMenu( data ).then( res => {
          dispatch( 'buttonList', res )
          const accessedRouters = filterAsyncRouter(
            asyncRouterMap,
            res
          )
          accessedRouters.push( {
            path: '*',
            redirect: '/404',
            hidden: true
          } )
          commit( 'SET_ROUTERS', accessedRouters )
          resolve()
        } )
      } )
    },
    buttonList( {
      commit
    }, data ) {
      const map = {}
      // 全局菜单按钮
      data.forEach( function ( item ) {
        item.children.forEach( function ( menu ) {
          const values = []
          if ( menu.buttonList && menu.buttonList.length > 0 ) {
            menu.buttonList.forEach( function ( button ) {
              values.push( button.buttonCode )
            } )
          }
          // 全局按钮处理
          map[ menu.menuUrl ] = values
        } )
      } )
      commit( 'G_BUTTON_LIST', map )
    }
  }
}

export default permission