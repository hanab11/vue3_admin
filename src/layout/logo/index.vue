<template>
  <div class="logo_container" v-if="setting.logoIsShow">
    <img :src="setting.logoPath" alt="【logo】" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo_container {
  width: 100%;
  height: $base-logo-height; // 容器高度（不包括内边距）
  display: flex; // 弹性容器
  align-items: center; // 垂直居中对齐，以容器高度为准（text-align水平居中对齐）
  padding: $base-logo-padding;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px; // 元素自身外边距（left需配定位使用）
  }
}
</style>
