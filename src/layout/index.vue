<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_menu">
      <!-- logo组件 -->
      <logo></logo>
      <!-- 菜单展示 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件，其中每一项是el-menu-item -->
        <el-menu background-color="black" text-color="white">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">导航1</el-menu-item>
          <!-- 折叠菜单 -->
          <el-sub-menu index="3">
            <!-- 折叠菜单标题，必须用具名插槽title，插槽v-slot简写为# -->
            <template #title><span>导航2(2级菜单)</span></template>
            <el-menu-item index="3-1">AA</el-menu-item>
            <el-menu-item index="3-2">BB</el-menu-item>
            <el-menu-item index="3-3">CC</el-menu-item>
            <el-sub-menu index="3-4">
              <template #title><span>3级菜单</span></template>
              <el-menu-item index="3-4-1">XXX</el-menu-item>
              <el-menu-item index="3-4-2">YYY</el-menu-item>
              <el-menu-item index="3-4-3">ZZZ</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
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

    .scrollbar {
      width: 100%;
      // 实际高度 = logo高度 + 内边距 * 2
      height: calc(100vh - $base-logo-height - $base-logo-padding * 2);
    }
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
    width: calc(100% - $base-menu-width - $base-main-padding * 2);
    height: calc(100vh - $base-tabbar-height - $base-main-padding * 2);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: $base-main-padding; // 设置内边距，需要在宽高里减掉padding*2，否则会撑出滑动条
    overflow: auto; // 若太高自动延伸
  }
}
</style>
