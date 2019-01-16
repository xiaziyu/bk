import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index';
import './style/index.less' // global css
import store from './store'
import '@/permission'
import { Loading, Toast } from 'vant'

import ba from 'vue-ba'
Vue.use(ba, "f067456684575eb639018bcafb7d78fd");
Vue.use(ba, { siteId: "f067456684575eb639018bcafb7d78fd" })

Vue.use(Loading)
Vue.use(Toast)
const toast_all = Toast.loading({
  duration: 0,
  forbidClick: true,
  mask: true,
  message: '加载中...'
});
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
