import Vue from 'vue'
import App from './App.vue'
import store from './store/'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
  // 数据名：store 是固定的名字，就像 data 一样
  // 数据值：是我们 import 进来的容器数据起的那个变量名字
  store
  // store: store
}).$mount('#app')
