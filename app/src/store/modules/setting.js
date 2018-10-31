import { getToken, setToken, removeToken, getOpenid, setOpenid, removeOpenid } from '@/utils/auth'

const setting = {
  state: {
    // api_url:'/',
    api_url:'?r=',
    client: '',
    source: '',
    token: getToken()||'',
    openid: getOpenid()||''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SOURCE: (state, source) => {
      state.source = source
    },
    SET_CLIENT: (state, client) => {
      state.client = client
    },
    SET_OPENID: (state, openid) => {
      state.openid = openid
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
    changeOpenid({ commit}, openid){
      return new Promise((resolve) => {
        commit('SET_OPENID', openid)
        resolve()
      })
    },
    changeSource({ commit }, source ){
      return new Promise((resolve) => {
        commit('SET_SOURCE', source)
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
        commit('SET_OPENID', '')
        removeToken()
        removeOpenid()
        resolve()
      })
    }
  }
}

export default setting
