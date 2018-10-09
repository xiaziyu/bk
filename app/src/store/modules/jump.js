// import { IsWap } from '@/utils/index'

const redirectUrl = 'https://buicktest.g100.org.cn'
const setting = {
  state: {
    login_url: {
      back_url: redirectUrl,
      // jd_url: 'https://oauth.jd.com/oauth/authorize?response_type=code&state=jdbk',
      jd_url: 'https://wq.jd.com/pinbind/pintokenredirect?biz=jdxyst',
      key: 'D2BF35C3E4CAC36C464BCF810C676123'
    },
    token_url: redirectUrl+'/?r=App/Auth/getToken',
    auth_url: {
      url:'https://bt.jd.com/v3/mobile/zoneAuth?source=s2',
      backURL: redirectUrl+'/auth/success',
      failback: redirectUrl+'/auth/fail'
    }
  },
  mutations: {
    SET_PIN: (state, pin) => {
      state.pin = pin
    }
  },
  actions:{
    jumpUrl({ commit, state }) {
      return new Promise((resolve) => {
        const [jd_url, back_url] = [state['login_url']['jd_url'], state['login_url']['back_url']]
        let url = jd_url+'&url='+back_url
        resolve(url)
      })
    },
    // tokenUrl({ commit, state}){
    //   return new Promise(resolve => {
    //     const [token_url, codes, states] = [state['token_url'], state['codes'], state['states']]
    //     let url = token_url+'&code='+codes+'&state='+states
    //     resolve(url)
    //   })
    // },
    authUrl({ commit, state}) {
      return new Promise(resolve => {
        const [jd_url, back, fail] = [state['auth_url']['url'], state['auth_url']['backURL'], state['auth_url']['failback']]
        let url = jd_url+'&backURL='+back+'&failbackurl='+fail
        resolve(url)
      })
    }
  }
}

export default setting