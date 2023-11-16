<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_menu">
      <!-- logo组件 -->
      <logo></logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
    </div>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar">456</div>
    <!-- 内容展示区 -->
    <div class="layout_main">789</div>
  </div>
</template>

<script setup lang="ts">
import logo from './logo/index.vue'
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: blue; // 仅区分，后期删

  .layout_menu {
    color: whitesmoke;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
  }

  .layout_tabbar {
    position: fixed; // fixed固定定位，常见于导航栏
    width: calc(100% - $base-menu-width); // cale百分比计算
    height: $base-tabbar-height;
    background: yellow; // 仅区分，后期删
    left: $base-menu-width;
    top: 0px;
  }

  .layout_main {
    position: absolute; // absolute绝对定位
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px; // 内边距
    overflow: auto; // 若太高自动延伸
  }
}
</style>
