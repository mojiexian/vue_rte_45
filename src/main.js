import Vue from 'vue'
import App from './App.vue'
// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入初始化样式
import '@/styles/index.less'
// 引入路由
import router from '@/router/index.js'
// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 判断用户是否登陆过或者是否跳转到登陆页面 如果是则继续
  var token = localStorage.getItem('vue_str_45')
  if (token || to.path === '/login') {
    next()
  } else {
    // 否则 重定向到登陆页
    next({
      name: 'login'
    })
  }
})

// 让 vue 使用 element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  // 注入
  router,

  render: h => h(App)
}).$mount('#app')
