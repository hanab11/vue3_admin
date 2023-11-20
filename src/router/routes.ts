// 对外暴露配置路由（常量路由），全部用户都可以访问到的路由
export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'), // 路由组件懒加载
    name: 'login', // 需要命名路由，做权限
    meta: {
      title: '登录',
      isShow: false,
      icon: 'Plus'
    }
  },
  {
    // 登录成功后，展示数据的路由（实际上放布局组件）
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '布局',
      isShow: true,
      icon: 'Minus'
    },
    children: [
      {
        // 首页
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          isShow: true,
          icon: 'House'
        }
      },
      {
        // 测试2
        path: '/test2',
        meta: {
          title: '测试页BB',
          isShow: true,
          icon: 'Female'
        },
        children: [
          {
            //测试3
            path: '/test3',
            meta: {
              title: '测试页CCC',
              isShow: true,
              icon: 'Male'
            }
          }
        ]
      }
    ]
  },
  {
    // 测试1
    path: '/test1',
    name: 'test',
    meta: {
      title: '测试页A',
      isShow: true,
      icon: 'Loading'
    }
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      isShow: false,
      icon: 'Link'
    }
  },
  {
    // 任意路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意路由',
      isShow: false,
      icon: 'Star'
    }
  }
]
