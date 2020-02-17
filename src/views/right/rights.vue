<template>
  <div class="rights">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button style="margin-bottom: 15px;" type="success" plain>添加角色</el-button>
    <!-- 添加表格 -->
      <el-table border :data="rightList" style="width: 100%">
        <el-table-column type="index" label="@" width="50"></el-table-column>
        <el-table-column prop="authName" label="角色名称" width="180"></el-table-column>

        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="层级" width="260">
          <template slot-scope="scope">
            {{scope.row.level | levelFormat}}
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import { getAllRightList } from '@/api/right_index.js'
export default {
  data () {
    return {
      rightList: [
      ]
    }
  },
  // 定义过滤器
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      } else {
        return ''
      }
    }
  },
  mounted () {
    getAllRightList('list')
      .then(res => {
        this.rightList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
</style>
