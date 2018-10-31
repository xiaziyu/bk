
// const redirectUrl = 'https://buicktest.g100.org.cn'
const redirectUrl = 'https://'+location.hostname
const setting = {
  state: {
    login_url: {//原微信跳转地址
      back_url: redirectUrl,
      // jd_url: 'https://oauth.jd.com/oauth/authorize?response_type=code&state=jdbk',
      jd_url: 'https://wq.jd.com/pinbind/pintokenredirect?biz=jdxyst'
      //key: 'D2BF35C3E4CAC36C464BCF810C676123'
    },
    jdCode_url: {//后京东文档跳转地址
      back_url: redirectUrl,
      jd_url: 'https://oauth.jd.com/oauth/authorize?response_type=code&state=jdbk&view=wap',
      key: 'D2BF35C3E4CAC36C464BCF810C676123'
    },
    jdOpenid_url: {//后京东新文档开放跳转地址
      back_url: redirectUrl,
      jd_url: 'https://jauth.jd.com/entrance?response_type=code&state=jdbk',
      appid: 'jd90d6f15ab29ba884',
      appsecret: 'b0074f3b41022c717d9632fb75083eee'
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
    jdCodeUrl({ commit, state }){
      return new Promise((resolve) => {
        const jd = state['jdCode_url']
        const [jd_url, back_url, key] = [jd['jd_url'], jd['back_url'], jd['key']]
        let url = jd_url+'&redirect_uri='+back_url+'&client_id='+key
        resolve(url)
      })
    },
    jdOpenIdUrl({ commit, state }){
      return new Promise((resolve) => {
        const [jd_url, back_url] = [state['login_url']['jd_url'], state['login_url']['back_url']]
        let url = jd_url+'&url='+back_url
        resolve(url)
      })
    },
    usersUrl({ commit, state}) {
      return new Promise(resolve => {
        const [jd_url, back, fail] = [state['auth_url']['url'], state['auth_url']['backURL'], state['auth_url']['failback']]
        let url = jd_url+'&backURL='+back+'&failbackurl='+fail
        resolve(url)
      })
    }
  }
}

export default setting
