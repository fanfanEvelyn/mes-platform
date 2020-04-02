import {
  asyncRoutes,
  constantRoutes
} from '@/router'
import path from 'path'
// import { getTreeList } from '@/api/resource.js'

/**
 * 确定用户是否有权限访问
 * 路由表path和资源url对上具有权限
 * @param {Object} resource：资源树
 * @param {Array} routes：路由表
 */
function permissionRoute(resource, routes, pPath) {
  if (resource && resource.url && routes && routes.length > 0) {
    //
    return routes.filter(item => {
      return path.resolve(pPath, item.path) == resource.url
    })
  } else {
    return []
  }
}

/**
 * 根据角色递归添加路由
 * @param {Array} routes：asyncRoutes
 * @param {Array} resources：资源树
 * @param {String} basePath：根路径
 */
export function filterAsyncRoutes(routes, resources, basePath) {
  const res = []

  resources.forEach(resource => {
    const tmp = {
      ...resource
    }
    let filterRoute = permissionRoute(tmp, routes, basePath)
    if (filterRoute.length > 0) {
      let tmpRoute = filterRoute[0]
      if (!tmpRoute.meta) {
        tmpRoute.meta = {}
      }
      tmpRoute.meta.title = tmp.name

      if (tmp.children && tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, tmp.children, path.resolve(basePath, tmpRoute.path))
      }
      res.push(tmpRoute)
    }
  })

  return res
}

const state = {
  permissionTree: [], // 权限树
  routes: [], // 完整路由
  addRoutes: [] // 新添加的路由（不包含常规路由）
}

const mutations = {
  SET_PERMISSION: (state, tree) => {
    state.permissionTree = tree
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({
    commit
  }) {
    // return new Promise((resolve, reject) => {
    //   getTreeList().then(res => {
    //     if (res.code === 10000) {
    //       commit('SET_PERMISSION', res.data)

    //       let accessedRoutes = filterAsyncRoutes(asyncRoutes, res.data, '/')
    //       commit('SET_ROUTES', accessedRoutes)
    //       resolve(accessedRoutes)
    //     } else {
    //       reject(res.msg)
    //     }
    //   }).catch(err => {
    //     reject(err)
    //   })
    // })

    return new Promise((resolve) => {
      const tmpRoutes = constantRoutes.concat(asyncRoutes)
      commit('SET_PERMISSION', tmpRoutes)
      commit('SET_ROUTES', asyncRoutes)
      resolve(asyncRoutes)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}