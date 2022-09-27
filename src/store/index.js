import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import ceratePersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  plugins: [ceratePersistedState({
    paths: ['user.token', 'user.hrsaasTime']
    // reducer(state) {
    //   return {
    //     user: state.user.token
    //   }
    // }
  })]
})

export default store
