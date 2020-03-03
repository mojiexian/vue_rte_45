<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <!-- 用户列表 -->
        <el-menu
          :collapse="isCollapse"
          :router="true"
          :unique-opened="true"
          class="el-menu-vertical-demo"
          background-color="#466248"
          text-color="#0AC6F7"
          active-text-color="#A5FA05"
        >
          <el-submenu :index="first.id+''" v-for="first in menuList" :key="first.id">
            <template slot="title">
              <i class="iconfont icon-caidanguanli" style="color: #F705F7; font-size: 24px;"></i>
              <span>{{first.authName}}</span>
            </template>

            <el-menu-item :index="'/home/'+second.path" v-for="second in first.children" :key="second.id">
              <i class="el-icon-bicycle" style="color: #F705F7; font-size: 20px;"></i>
              <span>{{second.authName}}</span>
            </el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <div
            @click="isCollapse = !isCollapse"
            class="iconfont icon-caidanguanli"
            style="color: #F51AE3; font-size: 35px;"
          ></div>
          <div>电商管理后台系统</div>
          <a href="javascript:;">退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getLeftMenu } from '@/api/right_index.js'
export default {
  data () {
    return {
      isCollapse: false,
      menuList: []
    }
  },
  mounted () {
    getLeftMenu()
      .then(res => {
        // console.log('YYY', res)
        this.menuList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  // 如果是展开状态 那么宽度就是200px 如果是合并状态 宽度： auto
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #466248;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #466248;
    color: mediumturquoise;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
}
</style>
