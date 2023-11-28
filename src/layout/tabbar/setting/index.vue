<template>
  <el-button size="small" circle icon="Refresh"></el-button>
  <el-button size="small" circle icon="FullScreen"></el-button>
  <el-button size="small" circle icon="Setting"></el-button>
  <img
    src="../../../../public/logo.png"
    alt="【logo】"
    style="width: 24px; height: 24px; margin: 0 10px"
  />
  <!-- el下拉菜单组件 -->
  <el-dropdown>
    <!-- 不加span的话，只渲染首个元素，字符串或图标 -->
    <span>
      用户名
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

<script setup lang="ts"></script>

<style scoped></style>
