/**
 * 资源菜单相关接口
 */
import request from '@/lib/request.js'

/**
 * 资源添加|编辑
 * @param {Object} data
 * .id：资源id，修改时传入
 * .method：请求方法类型
 * .name：菜单名称
 * .pid：上级菜单id
 * .remark：备注
 * .seq：顺序
 * .type：菜单类型
 * .url：菜单url
 */
export function addResourceOne (data) {
  return request({
    url: '/resource/addOne',
    method: 'post',
    data
  })
}

/**
 * 资源删除
 * @param {Object} data
 * .id：资源id
 * @returns {Object}
 */
export function deleteResource (data) {
  return request({
    url: '/resource/delete',
    method: 'post',
    data
  })
}

/**
 * 资源查询
 * @param {Object} data
 * .id：资源id
 * @returns {Object}
 */
export function getResourceOne (data) {
  return request({
    url: '/resource/getOne',
    method: 'post',
    data
  })
}

/**
 * 菜单获取
 * @param {Object} data none
 * @returns {Object}
 */
export function getMenus (data) {
  return request({
    url: '/resource/menus',
    method: 'post',
    data
  })
}

/**
 * 获取菜单树
 * @param {Object} data none
 * @returns {Object}
 */
export function getTreeList (data) {
  return request({
    url: '/resource/treeList',
    method: 'get',
    params: data
  })
}

/**
 * 资源更新
 * @param {Object} data
 * .id：资源id，修改时传入
 * .method：请求方法类型
 * .name：菜单名称
 * .pid：上级菜单id
 * .remark：备注
 * .seq：顺序
 * .type：菜单类型
 * .url：菜单url
 * @returns {Object}
 */
export function updateResourceOne (data) {
  return request({
    url: '/resource/update',
    method: 'post',
    data
  })
}