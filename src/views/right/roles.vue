<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button style="margin-bottom: 16px;" type="success" plain>成功按钮</el-button>
    <!-- 表单 -->
    <el-table :data="roleList" border style="width: 100%">
      <!-- 展开行 -->
      <el-table-column type="expand" label="@" width="60">
        <template slot-scope="scope">
          <!-- 准备 进行嵌套循环生成展开行数据展示结构 -->
          <el-row
            style="border-bottom: 1px dashed #ccc; margin-bottom: 10px;"
            v-for="first in scope.row.children"
            :key="first.id"
          >
            <el-col :span="4">
              <el-tag closable type="success">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col style="margin-bottom: 5px;" :span="4">
                  <el-tag closable type="info">{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    style="margin-bottom: 5px; margin-left: 3px;"
                    v-for="third in second.children"
                    :key="third.id"
                    closable
                    type="warning"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-show="scope.row.children.length  == 0" :span="24">没有任何的权限,请先分配！！</el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作" width="260">
        <template>
          <!--  slot-scope="scope" -->
          <el-button type="success" plain icon="el-icon-edit"></el-button>
          <el-button type="danger" plain icon="el-icon-delete"></el-button>
          <el-button type="info" plain icon="el-icon-s-promotion
          "></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllRolelist } from '@/api/role_index.js'
export default {
  data () {
    return {
      roleList: []
    }
  },
  methods: {
    async roleInit () {
      let res = await getAllRolelist()
      console.log('你那', res)
      this.roleList = res.data.data
    }
  },
  mounted () {
    this.roleInit()
  }
}
</script>

<style lang="less" scoped>
</style>
