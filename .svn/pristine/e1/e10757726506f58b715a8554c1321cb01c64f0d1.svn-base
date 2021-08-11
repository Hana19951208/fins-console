import {
  loginByUsername,
  logout,
  getUserInfo,
  chkApp
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken,
  setName,
  removeName
} from '@/utils/auth'
import {
  setItem,
  getItem,
  clear
} from '@/utils/storage'
import {
  encrypt
} from '@/utils'

const user = {
  state: {
    user: getItem( 'user' ) || {}, // 用户基本信息
    userProducts: [], // 用户拥有的产品集合
    msgCount: getItem( 'msgCount' ) || 0,
    hasConfigAuth: getItem( 'hasConfigAuth' ) || false, // 是否有配置中心权限
    topMenuIndex: 0, // 头部菜单选中下标
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: getItem( 'roles' ) || {}, // 用户的某个应用对应的用户角色集合
    apps: getItem( 'apps' ) || [], // 用户拥有的应用集合
    appId: getItem( 'appId' ) || "",
    setting: {
      articlePlatform: []
    },
    changeFlag: getItem( 'changeFlag' ),
  },

  mutations: {
    SET_CHANGEFLAG: ( state, changeFlag ) => {
      state.changeFlag = changeFlag
      setItem( 'changeFlag', changeFlag )
    },
    SET_CODE: ( state, code ) => {
      state.code = code
    },
    SET_TOKEN: ( state, token ) => {
      state.token = token
    },
    SET_USER: ( state, user ) => {
      state.user = user
      setItem( 'user', user )
    },
    SET_MSG_COUNT( state, msgCount ) {
      state.msgCount = msgCount
      setItem( 'msgCount', msgCount )
    },
    SET_USER_PRODUCT: ( state, userProducts ) => {
      state.userProducts = userProducts
    },
    SET_HAS_CONFIG_AUTH: ( state, hasConfigAuth ) => {
      state.hasConfigAuth = hasConfigAuth
      setItem( 'hasConfigAuth', hasConfigAuth )
    },
    SET_INTRODUCTION: ( state, introduction ) => {
      state.introduction = introduction
    },
    SET_SETTING: ( state, setting ) => {
      state.setting = setting
    },
    SET_STATUS: ( state, status ) => {
      state.status = status
    },
    SET_NAME: ( state, name ) => {
      state.name = name
    },
    SET_AVATAR: ( state, avatar ) => {
      state.avatar = avatar
    },
    SET_ROLES: ( state, roles ) => {
      state.roles = roles
      setItem( 'roles', roles )
    },
    SET_TOP_MENU_INDEX: ( state, index ) => {
      state.topMenuIndex = index
    },
    SET_APPS: ( state, apps ) => {
      state.apps = apps
      setItem( 'apps', apps )
    },
    SET_APP_ID: ( state, appId ) => {
      state.appId = appId
      setItem( 'appId', appId )
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername( {
      commit,
      dispatch
    }, userInfo ) {
      const username = userInfo.username.trim()
      const password = encrypt( userInfo.password )
      const channel = userInfo.channel
      return new Promise( ( resolve, reject ) => {
        loginByUsername( username, password, channel )
          .then( data => {
            commit( 'SET_TOKEN', data.token )
            setToken( data.token )
            dispatch( 'GetUserInfo', data )
            resolve()
          } )
          .catch( error => {
            reject( error )
          } )
      } )
    },

    // 获取用户信息
    GetUserInfo( {
      commit
    }, response ) {
      return new Promise( ( resolve, reject ) => {
        if ( !response.User ) {
          reject( '获取用户信息失败，请重新登录' )
        }
        const data = response.User
        const appList = response.Apps

        // 判断用户是否有应用访问权限
        if ( appList && appList.length > 0 ) {
          commit( 'SET_APPS', appList )
        } else {
          reject( '对不起，您没有可访问的应用，请联系系统管理员' )
        }
        commit( 'SET_USER', data )
        setName( data.userName )
        resolve( response )
      } )
    },

    // 根据appId获取当前应用对应的角色信息
    GetRoleInfoByAppId( {
      commit
    }, appsInfo ) {
      const { appsId, channel } = appsInfo
      return new Promise( ( resolve, reject ) => {
        chkApp( { appsId, channel } )
          .then( data => {
            commit( 'SET_APP_ID', appsId )
            commit( 'SET_ROLES', data.roleList || [] )
            commit( 'SET_USER', data )
            resolve( data )
          } )
          .catch( error => {
            reject( error )
          } )
      } )
    },

    // 登出
    LogOut( {
      commit,
      state
    } ) {
      return new Promise( ( resolve, reject ) => {
        logout( state.token )
          .then( () => {
            commit( 'SET_TOKEN', '' )
            commit( 'SET_ROLES', {} )
            commit( 'SET_APPS', [] )
            clear()
            removeToken()
            removeName()
            resolve()
          } )
          .catch( error => {
            reject( error )
          } )
      } )
    },

    // 前端 登出
    FedLogOut( {
      commit
    } ) {
      return new Promise( resolve => {
        commit( 'SET_TOKEN', '' )
        commit( 'SET_ROLES', {} )
        commit( 'SET_APPS', [] )
        clear()
        removeToken()
        removeName()
        resolve()
      } )
    },

    // 动态修改权限
    ChangeRoles( {
      commit,
      dispatch
    }, role ) {
      return new Promise( resolve => {
        commit( 'SET_TOKEN', role )
        setToken( role )
        getUserInfo( role ).then( response => {
          const data = response.data
          // commit( 'SET_ROLES', data.roles )
          commit( 'SET_APPS', data.apps )
          commit( 'SET_NAME', data.name )
          commit( 'SET_AVATAR', data.avatar )
          commit( 'SET_INTRODUCTION', data.introduction )
          // { menuChannel: 'PC', roleId: user.roleId, appsId: store.getters.appsId, isCheck: 1 }
          dispatch( 'GenerateRoutes', data ) // 动态修改权限后 重绘侧边菜单
          resolve()
        } )
      } )
    },

    // 首页切换角色
    ChangeRole( {
      commit,
      state
    }, role ) {
      return new Promise( resolve => {
        let user = typeof state.user === "string" ? JSON.parse( state.user ) : state.user || {}
        user.roleId = role.roleId
        user.roleCode = role.roleCode
        commit( 'SET_USER', user )
        resolve()
      } )
    },
  }
}

export default user