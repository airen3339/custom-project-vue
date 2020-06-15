import Vue from 'vue'
import App from "./App.vue"
import router from './router'

// 创建 Vue 实例
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")