<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <h1>SVG封装使用</h1>
    <svg-icon name="food" color="black" width="50px" height="50px"></svg-icon>
    <h1>SVG直接使用</h1>
    <!-- svg标签是图标容器，内部使用use标签 -->
    <svg style="width: 100px; height: 100px">
      <!-- xlink:href即使用哪个图标，属性值#icon-名字，备注图标可以动态绑定 -->
      <!-- fill属性可以设定颜色，尽量在复制svg代码时候直接调色 -->
      <use xlink:href="#icon-food" fill="skyblue"></use>
    </svg>
    <hr />
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
