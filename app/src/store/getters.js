const getters = {
  api_url: state => state.setting.api_url,//接口base地址
  pin: state => state.setting.pin, //pin配置
  token: state => state.setting.token, //token配置
  codes: state => state.setting.codes, //code配置
  states: state => state.setting.states, //states配置
  source: state => state.setting.source //source配置
}
export default getters
