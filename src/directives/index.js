import Vue from 'vue/dist/vue.esm.js'
import { Popover } from 'element-ui'
Vue.use(Popover)

// 全局自定义指令文件
/**
 * 聚焦输入框
 * v-focus
 */
export const focus = {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
}

/**
 * 按钮级权限验证
 * v-permission
 */
export const permission = {
  inserted: function (el, binding, vnode) {
    // let hasPermission = false // 是否有权限

    // let functionName = binding.value // 功能名称

    // // 没有传入功能名称时自动获取组件的Text作为功能名称
    // if (!functionName) {
    //   if (vnode.componentOptions && vnode.componentOptions.children && vnode.componentOptions.children.length > 0) {
    //     let btnText = vnode.componentOptions.children[0].text
    //     // 移除换行符，移除字符串的前后空格
    //     functionName = btnText && btnText.replace(/[\r\n]/g, '').replace(/(^\s*)|(\s*$)/g, '')
    //   }
    // }

    // if (functionName) {
    //   let permission_tree = [...vnode.context.$store.getters.permission_tree] // 获取全局权限树
    //   let pageUrl = vnode.context.$route.path // 获取页面路径

    //   hasPermission = permission_tree.some(i => {
    //     return i.children && i.children.some(ii => {
    //       return ii.url == pageUrl && ii.children && ii.children.some(iii => {
    //         return iii.name == functionName
    //       })
    //     })
    //   })
    // }

    // if (!hasPermission) {
    //   el.parentNode && el.parentNode.removeChild(el)
    // }
  }
}

export const formitemtip = {
  inserted (el, binding) {
    const label = el.querySelector('.el-form-item__content')
    var tipContent = binding.value || '暂无内容' // 传入的值
    const ep = new Vue({
      el: document.createElement('span'),
      template: `<el-popover
                content="${tipContent}"
                placement="right"
                width="300"
                :open-delay="300"
                trigger="hover">
                <i slot="reference" 
                   class="el-icon-question" 
                   style="position: absolute; font-size: inherit; line-height: inherit; margin-left: 5px;">
                </i>
              </el-popover>`
    })
    label.appendChild(ep.$el)
  }
}