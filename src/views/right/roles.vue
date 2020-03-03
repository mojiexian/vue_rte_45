<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button
      @click="adddialogFormVisible = true"
      style="margin-bottom: 16px;"
      type="success"
      plain
    >添加角色</el-button>
    <!-- 表单 -->
    <el-table :data="roleList" border style="width: 100%">
      <!-- 展开行 -->
      <el-table-column type="expand" label="@">
        <template slot-scope="scope">
          <!-- 准备 进行嵌套循环生成展开行数据展示结构 -->
          <el-row
            style="border-bottom: 1px dashed #ccc; margin-bottom: 10px;"
            v-for="first in scope.row.children"
            :key="first.id"
          >
            <el-col :span="4">
              <el-tag
                @close="delRightById(scope.row,first.id)"
                closable
                type="success"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col style="margin-bottom: 5px;" :span="4">
                  <el-tag
                    @close="delRightById(scope.row,second.id)"
                    closable
                    type="info"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    style="margin-bottom: 5px; margin-left: 3px;"
                    v-for="third in second.children"
                    :key="third.id"
                    closable
                    type="warning"
                    @close="delRightById(scope.row,third.id)"
                  >{{third.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-show="scope.row.children.length == 0" :span="24">没有任何的权限,请先分配！！</el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="success" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="角色权限" placement="top">
            <el-button
              @click="showGrantDialog(scope.row)"
              type="info"
              plain
              icon="el-icon-s-promotion
          "
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 角色授权对话框 -->
    <el-dialog title="角色权限" :visible.sync="grantdialogFormVisible">
      <el-tree
        ref="mytree"
        :data="rightList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="adddialogFormVisible">
      <el-form :model="addForm" :label-width="'100px'">
        <el-form-item label="角色名称">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllRolelist,
  delRightByRoleId,
  grantRightById,
  addRole
} from '@/api/role_index.js'
import { getAllRightList } from '@/api/right_index.js'
export default {
  data () {
    return {
      // 添加角色对话框
      adddialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      // 角色授权对话框
      grantdialogFormVisible: false,
      // 角色id
      roleId: '',
      // 默认选中
      checkedArr: [],
      // 角色数据
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 列表数据
      roleList: []
    }
  },
  methods: {
    // 新增角色
    async addRoleSubmit () {
      let res = await addRole(this.addForm)
      console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        this.adddialogFormVisible = false
        this.roleInit()
      }
    },
    // 实现角色权限的分配提交
    async grantSubmit () {
      var arr = this.$refs.mytree.getCheckedNodes()
      // 1.遍历数组，进行数据的拼接
      var temp = []
      arr.forEach(item => {
        temp.push(item.id + ',' + item.pid)
      })
      console.log('111', temp)
      // 2.将获取到的数组进行拼接
      var tempstr = temp.join(',')
      // console.log('222', tempstr)
      // 3.将字符串重新转为数组
      var temparr = tempstr.split(',')
      // console.log('333', temparr)
      // 4.数组去重
      var finalarr = [...new Set(temparr)]
      // console.log('444', finalarr)
      // 调用接口方法实现权限的分配
      let res = await grantRightById(this.roleId, finalarr.join(','))
      // console.log('555', res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        this.grantdialogFormVisible = false
        this.roleInit()
      }
    },
    // 开启角色授权对话框
    async showGrantDialog (row) {
      this.grantdialogFormVisible = true
      // 存储当前角色id，方便后期权限分配提交时的获取
      this.roleId = row.id
      // 进行所有数据的权限
      let res = await getAllRightList('tree')
      // console.log('袁阔', res)
      this.rightList = res.data.data
      // 获取当前角色权限
      this.checkedArr.length = 0
      if (row.children && row.children.length > 0) {
        row.children.forEach(first => {
          if (first.children && first.children.length > 0) {
            row.children.forEach(second => {
              if (second.children && second.children.length > 0) {
                second.children.forEach(third => {
                  // 添加id数组
                  this.checkedArr.push(third.id)
                })
              }
            })
          }
        })
      }
    },
    // 删除指定角色的指定权限
    async delRightById (row, rightId) {
      let res = await delRightByRoleId(row.id, rightId)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        // this.roleInit()
        // 当前行刷新便展开数据对象
        row.children = res.data.data
      }
    },
    // 角色数据的初始化
    async roleInit () {
      let res = await getAllRolelist()
      // console.log('你那', res)
      this.roleList = res.data.data
    }
  },
  mounted () {
    // 角色数据的初始化
    this.roleInit()
  }
}
</script>

<style lang="less" scoped>
</style>
