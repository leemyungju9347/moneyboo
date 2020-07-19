import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyC2DRUlQfy6_82ABoxb-J7rt1DRSbRi_mM',
  authDomain: 'moneyboo-project.firebaseapp.com',
  databaseURL: 'https://moneyboo-project.firebaseio.com',
  projectId: 'moneyboo-project',
  storageBucket: 'moneyboo-project.appspot.com',
  messagingSenderId: '681045800838',
  appId: '1:681045800838:web:60de03261337dfbd539e07',
  measurementId: 'G-QMRB1VXWCB',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
