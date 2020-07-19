import Vue from 'vue';
import Vuex from 'vuex';
import {
  getTotal,
  getCash,
  getBankAsset,
  getCategory,
} from '../utils/cookies.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    total: getTotal() || '',
    cash: getCash() || '',
    bankAsset: {
      bank: getBankAsset() || '',
      asset: getBankAsset() || 0,
    },
    category: getCategory() || '',
    listData: [],
  },
  mutations: {
    SET_DAILYLIST() {},
  },
  actions: {},
  modules: {},
});
