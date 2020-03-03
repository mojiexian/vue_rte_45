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
import Users from '@/views/users/users.vue'
// 权限列表
import Rights from '@/views/right/rights.vue'
import Roles from '@/views/right/roles.vue'
// 商品管理
import Goods from '@/views/goods/goods.vue'
import Params from '@/views/goods/params.vue'
import Categories from '@/views/goods/categories.vue'

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
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: 'rights',
          name: 'rigthts',
          component: Rights
        },
        {
          path: 'roles',
          name: 'roles',
          component: Roles
        },
        {
          path: 'goods',
          name: 'goods',
          component: Goods
        },
        // 路由重定向
        // redirect: {
        //   name: 'params'
        // },
        // 添加嵌套路由
        // children: [
        // ]
        {
          path: 'params',
          name: 'params',
          component: Params
        },
        { path: 'categories',
          name: 'categories',
          component: Categories
        }

      ]
    }
  ]
})

// 暴露
export default router
