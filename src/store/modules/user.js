import { login } from '@/api/login'

export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
    }
  }

}
