const getters = {
  api_url: state => state.setting.api_url,//接口base地址
  token_url: state => state.setting.token_url,
  codes: state => state.setting.codes //code配置
}
export default getters
