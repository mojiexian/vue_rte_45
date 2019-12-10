// 引入 vue
import Vue from 'vue'
// 引入 VueRrouter
import VueRouter from 'vue-router'
// 引入组件
import Login from '@/views/login.vue'

// 使用
Vue.use(VueRouter)

// 创建路由对象
var router = new VueRouter({
  // 添加路由配置
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

// 暴露
export default router
