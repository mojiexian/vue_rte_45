// 引入 vue
import Vue from 'vue'
// 引入 VueRrouter
import VueRouter from 'vue-router'
// 引入组件
// 登陆页
import Login from '@/views/login.vue'
// 首页
import Home from '@/views/home.vue'
//
import Welcome from '@/views/welcome.vue'

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
        }
      ]
    }
  ]
})

// 暴露
export default router
