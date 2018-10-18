const getters = {
  sidebar: state => state.app.sidebar,
  loading: state => app.app.loading, //loading配置
  pagination: state => state.setting.pagination, //页码配置
  api_url: state => state.setting.api_url,//接口base地址
  name: state => state.user.name, //name配置
}
export default getters
