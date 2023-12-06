<template>
  <!-- 刷新按钮 -->
  <el-button size="small" circle icon="Refresh" @click="refresh"></el-button>
  <!-- 全屏按钮 -->
  <el-button
    size="small"
    circle
    icon="FullScreen"
    @click="fullScreen"
  ></el-button>
  <!-- 设置按钮，待更新 -->
  <el-button size="small" circle icon="Setting"></el-button>
  <!-- 用户头像 -->
  <img
    :src="userStore.avatar"
    alt="【avatar】"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%"
  />
  <!-- el下拉菜单组件 -->
  <el-dropdown>
    <!-- 不加span的话，只渲染首个元素，字符串或图标 -->
    <span>
      <!-- 用户名 -->
      {{ userStore.username }}
      <el-icon>
        <ArrowDown />
      </el-icon>
    </span>
    <!-- 下拉菜单，必须用具名插槽dropdown -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
        <el-dropdown-item>Test</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useLayoutConfigStore from '@/store/modules/config'

// 获取用户相关的仓库
let userStore = useUserStore()

// 获取布局配置相关的仓库
let configStore = useLayoutConfigStore()

// 刷新按钮的回调
const refresh = () => {
  configStore.isRefresh = !configStore.isRefresh
}

// 全屏按钮的回调
const fullScreen = () => {
  console.log(document.fullscreenElement) // element存储全屏的值

  // DOM对象的属性，标记是否在全屏模式（true全屏，false非全屏）
  let full = document.fullscreenElement
  // 切换全屏模式，文档根节点的方法requestFullscreen实现全屏
  if (!full) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}
</script>

<script lang="ts">
export default {
  name: 'Setting'
}
</script>

<style scoped></style>
