import store from '@/store/index';
import { makeID } from '@/utils/filters.js';

// SetAsset.vue
function saveTotal(total) {
  console.log(total);
  document.cookie = `totalGoal = ${total}`;
}

function saveCash(cash) {
  document.cookie = `cashGoal = ${cash}`;
}

function saveBankAsset(bankAsset) {
  document.cookie = `bankAsset = ${JSON.stringify(bankAsset)}`;
}

// SetCategory.vue
function saveCategory(newCategory) {
  console.log(newCategory);
  // 1. cookie에 category목록이 있을 경우
  if (!getCategory()) {
    console.log(newCategory);
    document.cookie = `category = {${newCategory}}`;
  }
  // 2. cookie에 category목록이 없을 경우
  else if (getCategory()) {
    console.log('이미 category에 목록이 있음.');
    console.log(getCategory());
    document.cookie = `category = ${getCategory()}{${newCategory}}`;
  }
}

// DailyListAdd.vue
function saveListData(newList) {
  if (!checkListData()) {
    document.cookie = `listData = ${JSON.stringify(newList)}`;
    // document.cookie = `listData = ${newnewList}`;
    // document.cookie = `listData = ${newList}`;
  } else if (checkListData()) {
    // document.cookie = `listData = ${getListData()}${newList}`;
    // document.cookie = `listData = ${getListData()}${newnewList}`;
    document.cookie = `listData = ${checkListData()}${JSON.stringify(newList)}`;
  }
}

// Registration.vue
function saveAuth(name, value) {
  document.cookie = `${name}=${value}`;
}

function getUserEmail() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user_email\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getAuthUid() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user_uid\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

// 리스트를 저장할때 확인하는 함수
function checkListData() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)listData\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

// store에서 사용.
function getTotal() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)totalGoal\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}
function getCash() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)cashGoal\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}
function getBankAsset() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)bankAsset\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}
// ------ cookie에 저장 된 '은행 별 자산'들 불러와서 화면에 나타내줌 ------
function getBanksCookie(saveAsset) {
  // cookie에 저장된 bankAsset 불러와 변수 선언.
  let getbankasset = getBankAsset();
  let bankArr = getbankasset
    .split(/{/)
    .map(ele => ele.replace(/}/g, ''))
    .splice(1, getbankasset.length);

  // 각 은행 별 자산 속 bank, asset, id에 알맞은 값 넣어줌.
  for (let i = 0; i < bankArr.length; i++) {
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

    store.state.bankAsset.bank.push(bank);
    store.state.bankAsset.asset.push(asset);
    store.state.bankAsset.id.push(id);
  }

  console.log(store.state.bankAsset);
}

function getCategory() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)category\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}
// ------ cookie에 저장 된 '카테고리' 목록들 불러와서 화면에 나타내줌 ------
function getCategoryCookie() {
  // *** 1. cookie에 저장 된 카테고리 목록 불러옴 ***
  let cookieCategory = getCategory();

  // *** 2. 각 카테고리 별로 분할 ***
  // (cookie에서 불러온 카테고리 배열 속 카테고리들을 감싸고 있던 {}를 삭제해줌.)
  let categoryArr = cookieCategory.split(/{/).map(ele => ele.replace(/}/g, ''));
  // (바로 위에서 splice(/{/)을 통해 나눠줬을 때, 첫 번째 {로 나눈 부분에서 그 앞에 빈배열이 생성되었음. 따라서 이 빈배열을 삭제해 줘야함.)
  categoryArr.splice('', 1);

  // *** 3. 카테고리명과 아이콘주소를 모은 각각의 배열 생성 ***
  for (let i = 0; i < categoryArr.length; i++) {
    let iconId = categoryArr[i].slice(
      categoryArr[i].indexOf('|') + 1,
      categoryArr[i].legnth,
    );

    store.state.categorys.name.push(
      categoryArr[i].slice(0, categoryArr[i].indexOf('|')),
    );
    store.state.categorys.icon.push(
      iconId.replace(iconId.substr(iconId.indexOf('|'), iconId.length), ''),
    );
    store.state.categorys.id.push(
      iconId.slice(iconId.indexOf('|') + 1, iconId.length),
    );
  }
}

function getListData() {
  let listData = checkListData();
  let sortListData = listData.split(/{/).map(a => a.replace(/}/g, ''));
  sortListData.splice('', 1);
  for (let i = 0; i < sortListData.length; i++) {
    sortListData[i] = eval('({' + sortListData[i] + '})');
  }
  return sortListData;
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveTotal,
  saveCash,
  saveBankAsset,
  saveCategory,
  saveListData,
  getTotal,
  getCash,
  getBankAsset,
  getBanksCookie,
  getCategory,
  getCategoryCookie,
  getListData,
  deleteCookie,
  saveAuth,
  getUserEmail,
  getAuthUid,
};
