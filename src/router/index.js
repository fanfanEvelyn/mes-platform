import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout/index.vue';

/**
 * 常规路由
 * 无需身份认证
 * 所有用户均可以访问
 * 仍需登录后才可以访问
 */
export const constantRoutes = [{
    path: '/',
    name: 'loading',
    // redirect: '/home',
    component: () => import('@/components/loadingPage.vue'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/components/404.vue'),
    hidden: true
  }
];

/**
 * 动态加载路由
 * 需身份认证
 * 指定角色才可访问
 */
export const asyncRoutes = [
  //首页
  {
    path: '/home',
    component: Layout,
    // alwaysShow: true,        // 是否始终显示根目录，如果为true则需配置meta
    meta: {
      title: '首页',
      // icon: '/images/icon_home_n.png'
    },
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'welcome',
      component: () => import('@/views/homepage/welcome.vue'),
      meta: {
        title: '首页'
        // icon: ''
        // roles: ['admin']
      }
    }]
  },
  // 404一定要放在最后
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

/**
 * 构造基础路由
 */
const createRouter = () =>
  new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

/**
 * 重置路由
 */
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;