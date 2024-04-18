import { api } from '@/services/api'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    addresses: [],
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
    },
    addAddress(state, address) {
      state.addresses.push(address);
    },
    editAddress(state, editedAddress) {
      const index = state.addresses.findIndex(address => address.id === editedAddress.id);
      if (index !== -1) {
        Vue.set(state.addresses, index, editedAddress);
      }
    },
    deleteAddress(state, id) {
      state.addresses = state.addresses.filter(address => address.id !== id);
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
    },
    async addAddress({ commit }, newAddress) {
      try {
        const response = await api.post('/addresses', newAddress);
        commit('addAddress', response.data);
      } catch (error) {
        commit('setError', error.message);
      }
    },
    async editAddress({ commit }, editedAddress) {
      try {
        const response = await api.put(`/addresses/${editedAddress.id}`, editedAddress);
        commit('editAddress', response.data);
      } catch (error) {
        commit('setError', error.message);
      }
    },
    async deleteAddress({ commit }, id) {
      try {
        await api.delete(`/addresses/${id}`);
        commit('deleteAddress', id);
      } catch (error) {
        commit('setError', error.message);
      }
    }
  },
  modules: {
  }
})
