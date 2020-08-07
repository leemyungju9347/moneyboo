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
    // cookie
    email: getUserEmail() || '',
    uid: getAuthUid() || '',
  },
  getters: {
    isLogin(state) {
      // useremail 값이 없으면? (로그인되지 않았으면)
      // 빈문자열이 아니면 로그인 됐다라고 봄
      return state.email !== '';
    },
  },
  mutations: {
    // 로그인했을때 회원정보 저장
    SET_USER(state, email) {
      state.email = email;
    },
    // 로그아웃
    CLEAR_USER(state) {
      state.useremail = '';
    },
    SET_UID(state, uid) {
      state.uid = uid;
    },
  },
  actions: {},
  modules: {},
});
