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
            <el-button
              class="login_btn"
              :loading="isLoading"
              type="primary"
              size="default"
              @click="login"
            >
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { timeMsg } from '@/utils/time'
// 引入用户相关仓库
import useUserStore from '@/store/modules/user'

// 创建实例
let $router = useRouter()
let userStore = useUserStore()

// 控制按钮样式-loading
let isLoading = ref(false)
// 收集表单账密
let loginForm = reactive({ username: 'admin', password: '111111' })

// 登录按钮回调
const login = async () => {
  // 分析，点击按钮以后做的事（发请求，跳转，消息提示，交互样式）
  // 开始加载
  isLoading.value = true

  /* try catch写法 */
  try {
    // 保证登陆成功
    await userStore.userLogin(loginForm)

    $router.push('/home') // 编程式路由跳转到主页
    // 成功提示
    ElNotification({
      type: 'success',
      title: `${timeMsg()}`,
      message: '登陆成功' // 暂时写死
    })
  } catch (error) {
    // 停止加载
    isLoading.value = false
    // 失败提示
    ElNotification({
      type: 'error',
      message: (error as Error).message // 类型断言：as手动指定类型，Error是ts默认的类型
    })
  }

  /* promise.then写法 */
  /* userStore.userLogin(loginForm).then(
    // 成功回调
    (response) => {
      $router.push('/home')
      ElNotification({
        type: 'success',
        message: response
      })
    },
    // 失败回调
    (error) => {
      isLoading.value = false
      ElNotification({
        type: 'error',
        message: (error as Error).message
      })
    }
  ) */
}
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
