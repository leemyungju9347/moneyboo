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
  // getListData,
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
    //Registration
    email: getUserEmail() || '',
    uid: getAuthUid() || '',
    user: '',
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
  },
  actions: {},
  modules: {},
});
