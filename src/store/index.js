import { api } from '@/services/api'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addresses: null,
    error: null
  },
  getters: {
    addresses: state => state.addresses,
    error: state => state.error
  },
  mutations: {
    setAddresses(state, data) {
      state.addresses = data
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await api.get('/addresses');
        commit('setAddresses', response.data);

      } catch (error) {
        commit('setError', error.message);
      }
    }
  },
  modules: {
  }
})
