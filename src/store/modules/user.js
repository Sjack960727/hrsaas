import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
    REMOVE_USER_INFO(state, payload) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      // console.log(data)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const res1 = await getUserDetailById(res.userId)
      // console.log(res)
      const result = { ...res, ...res1 }
      console.log(result)
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    }
  }

}
