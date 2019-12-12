<template>
  <div class="login">
    <div class="container">
      <img src="@/assets/DenziQi.png" alt />
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-loginForm"
      >
        <!-- 用户框 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-wode" v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-yuechi" v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">登陆哈</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user_index.js'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请求入用户名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 再次实现数据的应征
      // 发起请求
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(this.loginForm)
            .then(res => {
              // console.log(res)
              if (res.data.meta.status === 200) {
                localStorage.setItem('vue_str_45', res.data.data.token)
                // 进行路由跳转
                this.$router.push({
                  name: 'home'
                })
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: 'error'
                })
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: '登陆失败eee',
                type: 'error'
              })
            })
        } else {
          this.$message({
            message: '数据输入不合法',
            type: 'error'
          })

          // 只有 return false 才能阻止请求
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #272822;
  .container {
    position: absolute;
    right: 0;
    left: 0;
    width: 460px;
    box-shadow: 0 0 30px #C608EA inset;
    margin: 200px auto;
    padding: 0px 40px 15px 40px;
    > img {
      position: relative;
      left: 50%;
      margin-left: -70px;
      margin-top: -80px;
      margin-bottom: 16px;
      width: 140px;
      height: 140px;
      box-sizing: border-box;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 12px #29e015 inset;
    }
    .el-button {
      width: 100%;
      background: #A2F00D;
      color: #F00FE3;
      font-size: 20px;
    }
  }
}
</style>
