// API统一管理，用户相关的接口
import request from '@/utils/request'
// 只引入类型

// 枚举用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}

// 暴露xxx请求函数（接口方法）（ts类型，在传入参数后加：，在方法后加 <第一个是参数类型, 第二个是返回值类型>）

// 登录请求接口
export const reqLogin = (data: any) =>
  request.post<any, any>(API.LOGIN_URL, data)

// 用户信息请求接口
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)

// 退出登录请求接口
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
