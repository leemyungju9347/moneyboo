import Vue from 'vue';
import Vuex from 'vuex';
import {
  getTotalGoal,
  getCashGoal,
  getCashAsset,
  // getBankAsset,
  getBanksCookieBank,
  getBanksCookieAsset,
  getBanksCookieId,
  getCategoryCookieName,
  getCategoryCookieIcon,
  getCategoryCookieId,
  getListData,
} from '../utils/cookies.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    totalGoal: getTotalGoal() || '',
    cashGoal: getCashGoal() || '',
    cashAsset: getCashAsset() || '',
    bankAsset: {
      bank: getBanksCookieBank() || [],
      asset: getBanksCookieAsset() || [],
      id: getBanksCookieId() || [],
      // bank: [],
      // asset: [],
      // id: [],
    },
    categorys: {
      name: getCategoryCookieName() || [],
      icon: getCategoryCookieIcon() || [],
      id: getCategoryCookieId() || [],
      // name: [],
      // icon: [],
      // id: [],
    },
    listData: getListData() || [],
  },
  mutations: {
    SET_DAILYLIST() {},
  },
  actions: {},
  modules: {},
});
