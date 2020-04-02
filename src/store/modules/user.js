import { login, loginout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, removeLocalToken } from '@/lib/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  uservo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERVO: (state, uservo) => {
    state.uservo = { ...uservo }
  }
}

const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        if (response.code > 0) {
          let data = response.data;
          // console.log(userInfo.phone)
          commit('SET_TOKEN', data)

          setToken(data)
          resolve()
        } else {
          reject(response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ token: state.token }).then(response => {
        if (response.code > 0) {
          // console.log()
          //用户信息赋值
          const uservo = response.data && response.data.uservo

          if (!uservo) {
            reject('获取用户信息失败')
          }

          //用户信息赋值
          commit('SET_USERVO', uservo)
          resolve()
        } else {
          reject('获取用户信息失败：' + response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  loginout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      loginout({ token: state.token }).then(response => {
        if (response.code > 0) {
          commit('SET_TOKEN', '')
          commit('SET_USERVO', {})

          removeToken()
          resetRouter()
          resolve()
        } else {
          reject('登出失败：' + response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_USERVO', {})

      removeToken()
      removeLocalToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
