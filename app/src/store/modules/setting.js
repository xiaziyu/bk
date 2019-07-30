import { getCode, setCode, removeCode, getOpenid, setOpenid, removeOpenid } from '@/utils/auth'
import { apiJdToken } from '@/api/login'

const setting = {
  state: {
    // api_url:'/',
    api_url:'?r=',
    client: '',
    source: '',
    codes: getCode() || '',
    states: 'jdbk',
    openid: getOpenid()||'',
    interval: ''
  },
  mutations: {
    SET_CODES: (state, codes) => {
      state.codes = codes
    },
    SET_STATES: (state, states) => {
      state.states = states
    },
    /*SET_TOKEN: (state, token) => {
      state.token = token
    },*/
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
    changeCode({ commit }, data){
      return new Promise((resolve) => {
        commit('SET_CODES', data.code)
        setCode(data.code)
        resolve()
      })
    },
    /*changeToken({ commit }, data) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      })
    },*/
    changeOpenid({ commit}, openid){
      return new Promise((resolve) => {
        commit('SET_OPENID', openid)
        setOpenid(openid)
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
    getJdToken({commit, state}){
      return new Promise((resolve) => {
        apiJdToken({openid: state.openid}).then().catch()
        if(!state.interval){
          state.interval = setInterval(() => {
            apiJdToken({openid: state.openid}).then().catch()
          }, 1000*60*28)
        }
        resolve()
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_CODES', '')
        commit('SET_OPENID', '')
        removeCode()
        removeOpenid()
        resolve()
      })
    }
  }
}

export default setting
