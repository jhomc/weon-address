import { fetchAddressData } from '@/services/api';

const state = {
  address: null,
  loading: false,
  error: null
};

const getters = {
  getAddress: state => state.address,
  isLoading: state => state.loading,
  getError: state => state.error
};

const mutations = {
  setAddress(state, address) {
    state.address = address;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  async fetchAddress({ commit }, zipcode) {
    commit('setLoading', true);
    try {
      const response = await fetchAddressData(zipcode);
      commit('setAddress', response.data);
      commit('setLoading', false);
    } catch (error) {
      commit('setError', error.message);
      commit('setLoading', false);
    }
  }
};

export default {
  namespaced: true, // Ensure namespacing for the module
  state,
  getters,
  mutations,
  actions
};