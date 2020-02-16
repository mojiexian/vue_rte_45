<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="iconfont icon-jt-xy-5">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区 -->
    <div style="margin-top: 15px; margin-bottom: 12px;">
      <el-input
        style="width: 300px; margin-right: 16px;"
        placeholder="请输入内容"
        v-model="userobj.query"
        class="input-with-select"
        @keyup.enter.native="init"
      >
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" plain @click="adddialogFormVisible = true">添加用户</el-button>
    </div>
    <!-- 表单区域 -->
    <template>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column label="用户状态" width="90">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              @change="changeState(scope.row.id, scope.row.mg_state)"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button class="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button class="el-icon-share" @click="showGrantDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="珊除" placement="top">
              <el-button class="el-icon-delete" @click="del(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" ref="addform" :label-width="'80px'" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="添加用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editform" ref="editform" :label-width="'80px'" :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="editform.username" style="width:100px" disabled autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="grantdialogFormVisible">
      <el-form :model="grantform" ref="grantform" :label-width="'80px'">
        <el-form-item label="用户名" prop="username">
          <span>{{grantform.username}}</span>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="grantform.rid" clearable placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantrole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllUserList,
  addUser,
  editUser,
  delUserById,
  updateUserStatae,
  grantUserRole
} from '@/api/user_index.js'
import { getAllRolelist } from '@/api/role_index.js'
export default {
  data () {
    return {
      // 分配角色
      grantdialogFormVisible: false,
      roleList: [],
      grantform: {
        id: '',
        rid: '',
        username: ''
      },
      // 编辑
      editdialogFormVisible: false,
      editform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      // 添加
      adddialogFormVisible: false,
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // a总记录数
      total: 0,
      // 用户搜索关键字
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      // 用户表单
      userList: [],
      // 验证表单规则
      rules: {
        username: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // 添加正则验证
          {
            pattern: /\w+[@]\w+[.]\w+/,
            message: '请出入合法的电子邮件',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入 合法的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 展示分配角色
    showGrantDialog (row) {
      this.grantdialogFormVisible = true
      this.grantform.id = row.id
      this.grantform.rid = row.rid
      this.grantform.username = row.username
    },
    // 用户角色
    async grantrole () {
      if (!this.grantform.rid) {
        this.$message({
          type: 'warnig',
          message: '请选择一个角色'
        })
      } else {
        let res = await grantUserRole(this.grantform)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '设置角色成功'
          })
          this.grantdialogFormVisible = false
          this.init()
        }
      }
    },
    // 修改用户状态
    async changeState (id, type) {
      let res = await updateUserStatae(id, type)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '修改状态成功'
        })
      }
    },
    // 根据id删除指定用户
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delUserById(id)
            .then(res2 => {
              console.log(res2)
              if (res2.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                // 如果代码到了这一步 说 明这条记录已经删除了 只是还没有刷新
                // this.userobj.pagenum: 2
                // this.total: 6
                // 6 - 1 / 4 =
                if (
                  Math.ceil((this.total - 1) / this.userobj.pagesize) <
                  this.userobj.pagenum
                ) {
                  this.userobj.pagenum--
                }
                // this.userobj.pagenum = Math.ceil((this.total - 1) / this.userobj.pagesize) ? --this.userobj.pagenum : this.userobj.pagenum
                // 刷新
                this.init()
              }
            })
            .catch(err2 => {
              console.log(err2)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑提交
    async editsubmit () {
      let res = await editUser(this.editform)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        // 隐藏对话框
        this.editdialogFormVisible = false
        // 重置表单元素的数据
        this.$refs.editform.resetFields()
        // 刷新
        this.init()
      }
    },
    // 编辑用户对话框
    showEditDialog (row) {
      this.editdialogFormVisible = true
      this.editform.id = row.id
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
    },
    // 添加用户
    addsubmit () {
      // 对表单元素进行验证
      this.$refs.addform.validate(valid => {
        if (valid) {
          // 调用接口方法
          addUser(this.addform)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: '数据添加成功'
                })
                //  隐藏对话框
                this.adddialogFormVisible = false
                //  重置表单元素的数据
                this.$refs.addform.resetFields()
                // 刷新
                this.init()
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message({
            type: 'error',
            message: '数据输入不合法'
          })
          return false
        }
      })
    },
    // 切换每页显示数量时触发
    handleSizeChange (val) {
      // 修改全局pagesize
      this.userobj.pagesize = val
      // 重新获取数据
      this.init()
    },
    // 切换当前页码时触发
    handleCurrentChange (val) {
      // 修改全局pagenum
      this.userobj.pagenum = val
      // 重新获取数据
      this.init()
    },
    // 数据初始化
    init () {
      getAllUserList(this.userobj)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            // 总记录数
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取所有角色数据
    async roleListInit () {
      let res = await getAllRolelist()
      this.roleList = res.data.data
    }
  },
  mounted () {
    this.init()
    this.roleListInit()
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  background: mediumaquamarine;
}
</style>
