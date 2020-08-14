// firebase 데이터 불러오는 함수 모아놓은 페이지
import store from '@/store/index';
import { moneybooRef } from '@/api/firebase';
// import { getAuthUid } from '@/utils/cookies.js';

function getAsset() {
  console.log('2. getAsset함수 실행');
  // firstore에서 asset DB 가져오기
  mbooRef()
    .doc('settings')
    .get()
    .then(docSnapshot => {
      // document의 값이 있으면
      if (docSnapshot.exists) {
        const setAsset = docSnapshot.data().setAsset;

        // setAsset 데이터가 있으면
        if (setAsset) {
          // 불러온 목표금액,현금자산 getAsset 객체에 저장
          //   this.saveAsset.totalGoal = setAsset.totalGoal;
          //   this.saveAsset.cashAsset = setAsset.cashAsset;
          //   this.saveAsset.cashGoal = setAsset.cashGoal;
          //   let totalGoal = setAsset.totalGoal;
          //   let cashAsset = setAsset.cashAsset;
          //   let cashGoal = setAsset.cashGoal;
          //   // 불러온 은행 자산들 getBanks에 저장
          //   setAsset.banks.forEach(data => {
          //     let banks;
          //     let getBanks;
          //     banks.push(data);
          //     getBanks.push(data);
          //   });
          // setAsset 데이터가 없으면
          console.log(setAsset);
          return setAsset;
        }
        // else {
        //   this.logMassage = '자산과 목표값을 입력해주세요!';
        //   console.log('setAsset 데이터가 없습니다!', docSnapshot);
        // }

        // document 값이 없으면
      } else {
        console.log('settings 값이 없음', docSnapshot);
        // this.logMassage = '셋팅 값을 입력해주세요!';
      }
    })
    .catch(err => {
      console.log(err);
    });
}
function getBankAsset() {
  console.log('1. getbankasset함수 실행');
  //   let get = getAsset();
  //   return console.log(get);
}

// firebase에서 uid 불러옴.
function mbooRef() {
  console.log('3. mbooRef 함수 실행');
  console.log(`store = ${store}`);
  let currentUid = store.state.uid;
  console.log(currentUid);
  return moneybooRef(currentUid);
}

export { getAsset, getBankAsset, mbooRef };
