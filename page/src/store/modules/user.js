import { getName, setName, removeName } from '@/utils/auth'
import { loginByUsername, logout } from '@/api/login'

const user = {
  state: {
    name: getName()||''
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    }
  },
  actions: {
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
    LogOut({ commit }) {
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
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_NAME', '')
        removeName()
        resolve()
      })
    }
  }
}

export default user
