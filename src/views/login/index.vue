<template>
  <div class="login_container">
    <el-row>
      <!-- 一行两列，EL里栅格共占24个单位，xs是宽度小于768时  -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎</h2>
          <!-- 用户名，每个表单项用el-form-item -->
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button class="login_btn" type="primary" size="default">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'

let loginForm = reactive({ username: 'admin', password: '111111' })
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh; // 视口样式，单位vh
  background: url('@/assets/images/background.jpg') no-repeat; // 背景图不重复
  background-size: cover; // 覆盖

  .login_form {
    position: relative; // 相对定位
    width: 75%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 60px; // 内边距

    h1 {
      font-size: 40px;
      color: white;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px; // 上下 左右 外边距
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
