import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: undefined
  },
  getters: {
    getToken: state => {
      return state.token;
    }
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload.token;
    },
    resetToken (state) {
      state.token = undefined
    }
  },
  actions: {
    login ({commit}, payload) {
      commit('setToken', payload);
    },
    logout({commit}) {
      commit('resetToken');
    }
  },
  modules: {
  }
})
