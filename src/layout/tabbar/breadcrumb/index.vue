<template>
  <el-icon style="margin-right: 10px">
    <Expand />
  </el-icon>
  <!-- el面包屑组件，其中每一项是el-breadcrumb-item，separator-icon图标分隔符 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>Test</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts"></script>

<style scoped></style>
