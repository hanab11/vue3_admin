<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_menu">
      <!-- Logo组件 -->
      <Logo></Logo>
      <!-- 菜单展示 -->
      <!-- el滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- el菜单组件，其中每一项是el-menu-item -->
        <el-menu
          background-color="gray"
          text-color="whitesmoke"
          active-text-color="yellow"
          collapse
          :default-active="$route.path"
        >
          <!-- Menu组件，传入路由数组，动态生成菜单项 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar">
      <!-- Tabbar组件待封装 -->
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main">
      <!-- Main组件 -->
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import useUserStore from '@/store/modules/user'
//import { useRoute } from 'vue-router' // 模板里可以直接使用$route实例对象

// 获取用户相关的仓库，用props把路由数据传递到子路由
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  background: skyblue; // 仅区分，后期删

  .layout_menu {
    color: whitesmoke;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;

    .scrollbar {
      width: 100%;
      // 实际高度 = logo高度 + 内边距 * 2
      height: calc(100vh - $base-logo-height - $base-logo-padding * 2);

      .el-menu {
        border-right: none; // 无右侧边界
      }
    }
  }

  .layout_tabbar {
    position: fixed; // fixed固定定位，常见于导航栏
    width: calc(100% - $base-menu-width); // calc计算
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
