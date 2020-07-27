import store from '../store/index';

// ------ 숫자에 콤마 붙여주는 함수 ------
function addComma(price) {
  return Number(price).toLocaleString();
}

// 아이디 출력 형식에 맞는 날짜 출력 함수
function conversionDateId(date) {
  let year = date
    .getFullYear()
    .toString()
    .substr(2, 4);
  let month = date.getMonth();
  let todayDate = date.getDate();
  return `${year}${month + 1}${todayDate}`;
  // 출력형식 : 200726
}

// 아이디출력 함수
function createId(category, date) {
  let num = Math.random()
    .toString(10)
    .substr(2, 6);
  let createIdName = `${category}${conversionDateId(date)}-${num}`;
  return createIdName;
}

// ------ cookie에 저장 된 '은행 별 자산'들 불러와서 화면에 나타내줌 ------
function getBanksCookie(saveAsset) {
  // cookie에 저장된 bankAsset 불러와 변수 선언.
  let getbankasset = store.state.bankAsset.bank;
  let bankArr = getbankasset
    .split(/{/)
    .map(ele => ele.replace(/}/g, ''))
    .splice(1, getbankasset.length);
  console.log(bankArr);
  console.log(saveAsset.banks);

  // 각 은행 별 자산 속 bank, asset, id에 알맞은 값 넣어줌.
  for (let i = 0; i < bankArr.length; i++) {
    console.log(saveAsset.banks);
    // cookie에 저장 된 은행 별 자산 개수만큼 화면에 찍어냄.
    saveAsset.banks.push({ bank: '', asset: 0, id: makeID('bank') });

    // cookie에 객체로 저장된 값을 bank, asset, id로 분리.
    let bank = bankArr[i].slice(
      bankArr[i].indexOf('bank') + 7,
      bankArr[i].indexOf('asset') - 3,
    );
    let asset = bankArr[i].slice(
      bankArr[i].indexOf('asset') + 8,
      bankArr[i].indexOf('id') - 3,
    );
    let id = bankArr[i].slice(
      bankArr[i].indexOf('id') + 5,
      bankArr[i].indexOf('-') + 5,
    );

    saveAsset.banks[i].bank = bank;
    saveAsset.banks[i].asset = asset;
    saveAsset.banks[i].id = id;
  }

  console.log(saveAsset.banks);
  console.log(saveAsset.banks.slice(0, saveAsset.banks.length - 1));
}

// ------ cookie에 저장 된 '카테고리' 목록들 불러와서 화면에 나타내줌 ------
function getCategoryCookie(
  categoryNum,
  showCategoryName,
  showCategoryIcon,
  showCategoryId,
) {
  // *** 1. cookie에 저장 된 카테고리 목록 불러옴 ***
  let cookieCategory = store.state.category;
  console.log(cookieCategory);

  // *** 2. 각 카테고리 별로 분할 ***
  // (cookie에서 불러온 카테고리 배열 속 카테고리들을 감싸고 있던 {}를 삭제해줌.)
  let categoryArr = cookieCategory.split(/{/).map(ele => ele.replace(/}/g, ''));
  // (바로 위에서 splice(/{/)을 통해 나눠줬을 때, 첫 번째 {로 나눈 부분에서 그 앞에 빈배열이 생성되었음. 따라서 이 빈배열을 삭제해 줘야함.)
  categoryArr.splice('', 1);
  // (저장된 카테고리들 개수를 데이터에 저장해줌.)
  categoryNum = categoryArr.length;
  console.log(categoryNum);

  // *** 3. 카테고리명과 아이콘주소를 모은 각각의 배열 생성 ***
  for (let i = 0; i < categoryArr.length; i++) {
    let iconId = categoryArr[i].slice(
      categoryArr[i].indexOf('|') + 1,
      categoryArr[i].legnth,
    );

    showCategoryName.push(categoryArr[i].slice(0, categoryArr[i].indexOf('|')));
    showCategoryIcon.push(
      iconId.replace(iconId.substr(iconId.indexOf('|'), iconId.length), ''),
    );
    showCategoryId.push(iconId.slice(iconId.indexOf('|') + 1, iconId.length));
  }
}

// ------ cookie에 저장할 때 부여해줄 id 생성 ------
function makeID(type) {
  // date 구함.
  let year = String(new Date().getFullYear()).substr(2, 2);
  let month =
    new Date().getMonth() < 10
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1;
  let date = new Date().getDate();
  // type구함.
  type === 'category' ? (type = 'c') : type === 'bank' ? (type = 'b') : 'l';
  // 랜덤숫자 구함.
  let randomNum = Math.floor(Math.random() * 10000);

  // type + date + 랜덤숫자 조합해 id생성.
  let idDate = `${type}${year}${month}${date}-${randomNum}`;
  console.log(idDate);

  return idDate;
}

export { addComma, getBanksCookie, getCategoryCookie, createId, makeID };
