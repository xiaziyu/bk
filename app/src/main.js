import './common/rem';
import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import './style/index.less' // global css
import { Loading, Toast } from 'vant';

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
  el: '#app',
  render: h => h(App)
});
