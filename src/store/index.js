import Vue from 'vue';
import Vuex from 'vuex';
import {
  getTotal,
  getCash,
  // getBankAsset,
  getListData,
} from '../utils/cookies.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    total: getTotal() || '',
    cash: getCash() || '',
    bankAsset: {
      bank: [],
      asset: [],
      id: [],
    },
    categorys: {
      name: [],
      icon: [],
      id: [],
    },
    listData: getListData() || [],
  },
  mutations: {
    SET_DAILYLIST() {},
  },
  actions: {},
  modules: {},
});
