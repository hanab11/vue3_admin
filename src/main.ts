import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

// 提交前格式化
const a = 1
function A(a) {
  console.log('这是a', a)
}
A(a)
