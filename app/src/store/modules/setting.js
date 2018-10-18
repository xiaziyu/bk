import { getToken, setToken, removeToken, getPin, setPin, removePin } from '@/utils/auth'

const setting = {
  state: {
    // api_url:'/',
    api_url:'?r=',
    client: '',
    source: '',
    pin: getToken()||'',
    token: getPin()||''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SOURCE: (state, source) => {
      state.source = source
    },
    SET_PIN: (state, pin) => {
      state.pin = pin
    },
    SET_CLIENT: (state, client) => {
      state.client = client
    }
  },
  actions:{
    changeToken({ commit }, data) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      })
    },
    changeSource({ commit }, source ){
      return new Promise((resolve) => {
        commit('SET_SOURCE', source)
        resolve()
      })
    },
    changePin({ commit}, pin){
      return new Promise((resolve) => {
        commit('SET_PIN', pin)
        setPin(pin)
        resolve()
      })
    },
    changeClient({ commit}, client){
      return new Promise((resolve) => {
        commit('SET_CLIENT', client)
        resolve()
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_PIN', '')
        removeToken()
        removePin()
        resolve()
      })
    }
  }
}

export default setting
