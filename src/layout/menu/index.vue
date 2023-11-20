<template>
  <div>
    <!-- 遍历路由数组 -->
    <template v-for="(item, index) in menuList" :key="item.path">
      <!-- 分析逻辑：先看是否展示，再按有无子路由区分 -->
      <template v-if="item.meta.isShow">
        <!-- 无子路由，用普通菜单 -->
        <el-menu-item
          v-if="!item.children"
          :index="item.path"
          @click="pushRoute"
        >
          <el-icon>
            <!-- component标签，实现动态绑定组件 -->
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>

        <!-- 有子路由，用折叠菜单 -->
        <el-sub-menu v-if="item.children" :index="item.path">
          <!-- 折叠菜单标题，必须用具名插槽title，插槽v-slot简写为# -->
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 把子路由数组传入自身Menu组件 -->
          <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
// 引入自身组件，实现递归（把N+1级路由数组当做N级的，再执行一次组件的逻辑代码）
import Menu from './index.vue'
// 获取父组件传递的路由数组（理解：传入不同的数据，自身也可以是自身的父组件，这里用props方便递归）
defineProps(['menuList'])

// 菜单项点击回调
const pushRoute = (vc) => {
  console.log(vc.index) // 暂打印
}
</script>

<style scoped></style>
