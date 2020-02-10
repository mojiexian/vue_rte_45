// 引入 vue
import Vue from 'vue'
// 引入 VueRrouter
import VueRouter from 'vue-router'
// 引入组件
// 登陆页
import Login from '@/views/login.vue'
// 首页
import Home from '@/views/home.vue'
// 欢迎页
import Welcome from '@/views/welcome.vue'
// 用户列表页
import Suer from '@/views/suers/suer.vue'

// 使用
Vue.use(VueRouter)

// 创建路由对象
var router = new VueRouter({
  // 添加路由配置
  routes: [
    {
      path: '/',
      name: 'default',
      // 路由重定向
      redirect: {
        name: 'login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      // 路由重定向
      redirect: {
        name: 'welcome'
      },
      // 添加嵌套路由
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          path: 'suer',
          name: 'suer',
          component: Suer
        }
      ]
    }
  ]
})

// 暴露
export default router
