<template>
  <!-- router-view展示的是路由组件 -->
  <router-view v-slot="{ Component }">
    <!-- 用transition标签，给组件实例加上过渡动画 -->
    <transition name="fade">
      <!-- 用component标签，动态获取组件实例，渲染的是layout路由组件的子路由 -->
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: 'Main@'
}
</script>

<style scoped lang="scss">
// 只需要进入的动画
.fade-enter-active {
  transition: 0.5s;
}
// 从哪来，离开哪去，用同一组样式
.fade-enter-from {
  opacity: 0;
  transform: scale(0); // 改变 大小
}
// 来到哪，从哪离开，用同一组样式
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
