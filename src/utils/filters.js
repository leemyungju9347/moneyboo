// import store from '../store/index';

// ------ 숫자에 콤마 붙여주는 함수 ------
function addComma(price) {
  return Number(price).toLocaleString();
}

// // ------ cookie에 저장 된 '은행 별 자산'들 불러와서 화면에 나타내줌 ------
// function getBanksCookie(saveAsset) {
//   // cookie에 저장된 bankAsset 불러와 변수 선언.
//   let getbankasset = store.state.bankAsset.bank;
//   let bankArr = getbankasset
//     .split(/{/)
//     .map(ele => ele.replace(/}/g, ''))
//     .splice(1, getbankasset.length);
//   console.log(bankArr);
//   console.log(saveAsset.banks);

//   // 각 은행 별 자산 속 bank, asset, id에 알맞은 값 넣어줌.
//   for (let i = 0; i < bankArr.length; i++) {
//     console.log(saveAsset.banks);
//     // cookie에 저장 된 은행 별 자산 개수만큼 화면에 찍어냄.
//     saveAsset.banks.push({ bank: '', asset: 0, id: makeID('bank') });

//     // cookie에 객체로 저장된 값을 bank, asset, id로 분리.
//     let bank = bankArr[i].slice(
//       bankArr[i].indexOf('bank') + 7,
//       bankArr[i].indexOf('asset') - 3,
//     );
//     let asset = bankArr[i].slice(
//       bankArr[i].indexOf('asset') + 8,
//       bankArr[i].indexOf('id') - 3,
//     );
//     let id = bankArr[i].slice(
//       bankArr[i].indexOf('id') + 5,
//       bankArr[i].indexOf('-') + 5,
//     );

//     saveAsset.banks[i].bank = bank;
//     saveAsset.banks[i].asset = asset;
//     saveAsset.banks[i].id = id;
//   }

//   console.log(saveAsset.banks);
//   console.log(saveAsset.banks.slice(0, saveAsset.banks.length - 1));
// }

// ------ cookie에 저장할 때 부여해줄 id 생성 ------
function makeID(type) {
  // date 구함.
  let year = String(new Date().getFullYear()).substr(2, 2);
  let month =
    new Date().getMonth() < 10
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1;
  let date = new Date().getDate();

  let hh = new Date().getHours().toString();
  let mm = new Date().getMinutes().toString();
  let ss = new Date().getSeconds().toString();

  const nowTime = ` ${hh < 10 ? `0${hh}` : hh}${mm < 10 ? `0${mm}` : mm}${
    ss < 10 ? `0${ss}` : ss
  } `;

  // type구함.
  type === 'category' ? (type = 'c') : type === 'bank' ? (type = 'b') : 'l';

  // type + date + 시분초 조합해 id생성.
  let idDate = `${type}${year}${month}${date}-${nowTime}`;
  console.log(idDate);

  return idDate;
}

// 오늘의 년 + 월 을 가져오는 함수
function newConversionMonth() {
  const year = String(new Date().getFullYear()).substr(2, 2);
  const month =
    new Date().getMonth() < 10
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1;

  return `${year}.${month}`;
}

export {
  addComma,
  /*getBanksCookie, getCategoryCookie,*/ makeID,
  newConversionMonth,
};
