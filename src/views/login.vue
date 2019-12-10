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
          <el-button type="primary" @click="submitForm('loginForm')">登陆哈</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请求入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
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
    box-shadow: 0 0 120px #C608EA inset;
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
