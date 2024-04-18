import Vue from 'vue';
import Vuex from 'vuex';
import addressModule from './modules/address';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    address: addressModule
  }
});