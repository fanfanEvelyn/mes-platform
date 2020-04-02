import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import { getToken } from '@/lib/auth'

const whiteList = ['/login']    // 白名单内的路径无需登录可直接访问

router.beforeEach(async (to, from, next) => {
  // 进度条启动
  NProgress.start()

  // 获取用户token，判断是否已经登录
  const hasToken = getToken()
  // console.log(hasToken)

  if (hasToken) {
    store.commit('user/SET_TOKEN', hasToken);
    if (to.path === '/login') {
      // 已经登录情况下，不再经过登录页，直接进入主页
      next({ path: '/' })
    } else {
      // 确定是否获取了用户信息
      const hasUservo = store.getters.uservo && store.getters.uservo.phone

      if (hasUservo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')
          // 生成可访问路由
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          // 动态添加路由
          router.addRoutes(accessRoutes)

          // 获取有权限的小区列表
          await store.dispatch('community/getOptions')

          next({ ...to, replace: true })
        } catch (error) {
          // 移除token并重新登录
          await store.dispatch('user/resetToken')
          
          if (typeof(error) == 'string') {
            Message.error(error || '登录已过期')
          }

          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* token不存在 */

    if (whiteList.indexOf(to.path) !== -1) {
      // 目标路径在免登陆白名单里，直接前往
      next()
    } else {
      // 其它页面需经登录
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
