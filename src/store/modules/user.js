import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
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
    },
    REMOVE_TOKEN(state, payload) {
      state.token = null
    },
    SET_HRSAASTIME(state, payload) {
      state.hrsaasTime = payload
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      // console.log(data)
      commit('SET_TOKEN', data)
      commit('SET_HRSAASTIME', +new Date())
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const res1 = await getUserDetailById(res.userId)
      // console.log(res)
      const result = { ...res, ...res1 }
      // console.log(result)
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    },
    logout({ commit }) {
      commit('REMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
    }

  }

}
