import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS reset

import {Pagination, Dialog, Menu, Submenu, MenuItem, MenuItemGroup, Input, Checkbox, CheckboxButton, CheckboxGroup,
  Button, ButtonGroup, Table, TableColumn, Tooltip, Form, FormItem, Icon, Row, Col, Loading, MessageBox, Message, Notification} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Icon)

Vue.use(Row)
Vue.use(Col)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

import App from './App.vue'
import { router } from './router/admin';
import './style/admin.less' // global css
import store from './store'
Vue.prototype.$ELEMENT = { size: 'small'}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
