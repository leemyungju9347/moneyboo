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
  getUserEmail,
  getAuthUid,
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
    //Registration
    email: getUserEmail() || '',
    uid: getAuthUid() || '',
  },
  mutations: {},
  actions: {},
  modules: {},
});
