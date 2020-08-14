// import store from '@/store/index';
// import { moneybooRef } from '@/api/firebase';

// const currentUid = store.state.uid;

//function getCategory() {
//   console.log('파이어베이스 출력한다!!!!!!!!!!!', store.state.uid);
//   mbooRef()
//     .doc('settings')
//     .get()
//     .then(docSnapshot => {
//       // document가 존재하면
//       if (docSnapshot.exists) {
//         const setCategory = docSnapshot.data().setCategory;

//         // setCategory 데이터가 있으면
//         if (setCategory) {
//           setCategory.forEach(data => {
//             this.getCategory.push(data);
//           });

//           // setCategory 데이터가 없으면
//         } else {
//           this.logMessage = '카테고리 값을 입력해주세요!';
//         }

//         // document가 없으면
//       } else {
//         this.logMessage = '셋팅 값을 입력해주세요!';
//       }
//     })
//     .catch(err => {
//       console.log('에러 발생한 위치 setCategory.vue created부분', err);
//     });
//   console.log(mbooRef);
//   return mbooRef();
//return 'a';
//}

// function mbooRef() {
//   return moneybooRef(currentUid);
// }

//export default getCategory;
