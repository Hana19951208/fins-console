import Cookies from 'js-cookie'
import {
  getItem,
  setItem
} from '@/utils/storage'
import {
  getAllDictTypeAndEntry
} from '@/api/modules/system/dict'

const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    dicts: getItem( 'dicts' ) || [],
    device: 'desktop',
    language: 'zh',
    size: Cookies.get( 'size' ) || 'medium'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if ( state.sidebar.opened ) {
        Cookies.set( 'sidebarStatus', 1 )
      } else {
        Cookies.set( 'sidebarStatus', 0 )
      }
    },
    CLOSE_SIDEBAR: ( state, withoutAnimation ) => {
      Cookies.set( 'sidebarStatus', 0 )
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: ( state, device ) => {
      state.device = device
    },
    SET_LANGUAGE: ( state, language ) => {
      state.language = language
      Cookies.set( 'language', language )
    },
    SET_SIZE: ( state, size ) => {
      state.size = size
      Cookies.set( 'size', size )
    },
    SET_DICTS: ( state, dicts ) => {
      state.dicts = dicts
      setItem( 'dicts', dicts )
    }
  },
  actions: {
    toggleSideBar( {
      commit
    } ) {
      commit( 'TOGGLE_SIDEBAR' )
    },
    closeSideBar( {
      commit
    }, {
      withoutAnimation
    } ) {
      commit( 'CLOSE_SIDEBAR', withoutAnimation )
    },
    toggleDevice( {
      commit
    }, device ) {
      commit( 'TOGGLE_DEVICE', device )
    },
    setLanguage( {
      commit
    }, language ) {
      commit( 'SET_LANGUAGE', language )
    },
    setSize( {
      commit
    }, size ) {
      commit( 'SET_SIZE', size )
    },
    GenerateDicts( {
      commit
    }, data ) {
      return new Promise( () => {
        getAllDictTypeAndEntry( data ).then( res => {
          commit( 'SET_DICTS', res )
        } )
      } )
    }
  }
}

export default app