// 用户相关的小仓库模块
import { defineStore } from 'pinia'

// 创建小仓库User，选项式
const useUserStore = defineStore('User', {
  // 状态数据，要求使用函数返回值，来存储数据
  state: () => {
    return {
      i: 1
    }
  },
  // 异步逻辑
  actions: {},
  // 计算属性
  getters: {}
})

// 暴露小仓库方法
export default useUserStore
