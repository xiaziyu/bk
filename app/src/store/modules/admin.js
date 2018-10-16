import Cookies from 'js-cookie'
import { getName, setName, removeName } from '@/utils/auth'
import { loginByUsername, logout } from '@/apiAdmin/login'

const admin = {
  state: {
    name: getName(),
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    pagination: {
      limit: 30,
      tableMax: 590,
      layout: 'total, prev, pager, next'
    },
    loading: true
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    TOGGLE_LOAD: (state, value) => {
      state.loading = value
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    toggleLoad({ commit } , value){
      commit('TOGGLE_LOAD', value)
    },
    LoginByUsername({ commit } , userInfo){
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          const data = response.data
          setName(data.name)
          commit('SET_NAME', data.name)
          resolve()
        }).catch(error => {
          console.log('用户名登录有误')
          reject(error)
        })
      }).catch(error=>console.log(error))
    },
    // 登出
    adminLogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_NAME', '')
          removeName()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    adminFedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_NAME', '')
        removeName()
        resolve()
      })
    }
  }
}

export default admin
