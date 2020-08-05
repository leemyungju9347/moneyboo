import firebase from 'firebase';

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
//firebase 초기화
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

// 인증 관련 변수
const auth = firebaseApp.auth();

// firestore 데이터베이스
const db = firebaseApp.firestore();

// users Collection
function getUsersRef() {
  return db.collection('users');
}

function moneybooRef(curUid) {
  return getUsersRef()
    .doc(curUid)
    .collection('moneyboo');
}

export { auth, db, getUsersRef, moneybooRef };
