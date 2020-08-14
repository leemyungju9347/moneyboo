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

//firebase init
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// firebase Authentication
const auth = firebaseApp.auth();

// firestore Database
const db = firebaseApp.firestore();
// const provider = new firebase.auth.EmailAuthProvider();

// users Collection
function getUsersRef() {
  return db.collection('users');
}

// moneyboo Collection
function moneybooRef(curUid) {
  return getUsersRef()
    .doc(curUid)
    .collection('moneyboo');
}

// login
function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// signup
function signupUser(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// user profile update
function userProfileUpdate(data, nickname) {
  return data.user.updateProfile({
    displayName: nickname,
  });
}

export {
  auth,
  db,
  getUsersRef,
  moneybooRef,
  loginUser,
  signupUser,
  userProfileUpdate,
};
