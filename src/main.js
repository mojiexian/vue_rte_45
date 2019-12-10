import Vue from 'vue'
import App from './App.vue'
// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入初始化样式
import '@/styles/index.less'
// 引入路由
import router from '@/router/index.js'

// 让 vue 使用 element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 注入
  router,

  render: h => h(App)
}).$mount('#app')
