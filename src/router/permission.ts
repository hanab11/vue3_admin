// 路由鉴权：项目中的路由的权限设置（某个路由什么条件下可访问、不可访问）
import router from '.'
// 引入nprogress
import nprogress from 'nprogress'
// 引入nprogress进度条样式
import 'nprogress/nprogress.css'

// 全局路由守卫，访问任意路由都会触发的钩子

// 全局前置守卫，访问某路由之前
router.beforeEach((to, from, next) => {
  // to将访问的路由，from来自的路由，next路由的放行函数
  nprogress.start()
  next()
})

// 全局后置守卫，访问某路由之后
router.afterEach((to, from, failure) => {
  nprogress.done()
})

//
// 处理项目存在的问题
//
// 1，任意路由切换的进度条业务 nprogress
// 2，
// 3，
