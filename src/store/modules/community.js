import { getToken } from '@/lib/auth'
import utils from '@/lib/utils'
import { allCommunityList } from '@/api/user.js'
const state = {
  communityOptions: [], // 可访问的社区列表选项
  communitySelected: {} // 选中的社区信息
}

const mutations = {
  SET_OPTIONS: (state, options) => {
    state.communityOptions = options
  },
  SET_SELECTED: (state, selectedId) => {
    // selectedId为更改后的选项id
    if (state.communityOptions && state.communityOptions.length > 0) {
      // 至少有一个选项才执行 
      // selected值为空时从缓存中读取备选项
      if (!selectedId) {
        selectedId = readSelected()
      }

      let selectedOption = state.communityOptions.filter(item => { return item.communityId == selectedId })
      if (selectedOption.length === 0) {
        // selected值不在选项列表中时，取第一个选项作为选中值

        state.communitySelected = state.communityOptions[0]
        saveSelected(state.communityOptions[0].communityId)
      } else {
        state.communitySelected = selectedOption[0]
        saveSelected(selectedOption[0].communityId)
      }
    }
  }
}

const actions = {
  getOptions ({ commit }) {
    return new Promise((resolve, reject) => {
      allCommunityList({ token: getToken() })
        .then(res => {
          if (res.code === 10000) {
            const { data } = res

            commit('SET_OPTIONS', data)
            commit('SET_SELECTED')
            resolve()
          } else {
            reject('获取社区列表'+res.msg)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  changeSelected ({ commit }, selected) {
    return new Promise(resolve => {
      commit('SET_SELECTED', selected)
      resolve()
    })
  }
}

function saveSelected (selected) {
  utils.toolFn.localSet('community_selected', selected)
}

function readSelected () {
  return utils.toolFn.localGet('community_selected')
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}