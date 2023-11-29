<template>
  <el-icon style="margin-right: 10px">
    <Expand />
  </el-icon>
  <!-- el面包屑组件，其中每一项是el-breadcrumb-item，separator-icon图标分隔符，to属性让父路由可点击路由跳转 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 遍历匹配数据 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="!item.meta.hidden"
      :to="item.path"
    >
      <!-- 展示匹配的图标 -->
      <el-icon class="icon_container">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 展示匹配的标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

// 获取路由实例对象，$route.matched根据路由表得到匹配数据
let $route = useRoute()
</script>

<style scoped lang="scss">
.icon_container {
  vertical-align: top; // 把元素的顶部与行中最高元素的顶部对齐（垂直对齐）
}
</style>
