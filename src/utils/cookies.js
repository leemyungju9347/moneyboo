// import store from '@/store/index';
// import { makeID } from '@/utils/filters.js';

// SetAsset.vue
function saveTotalGoal(total) {
  console.log(total);
  document.cookie = `totalGoal = ${total}`;
}

function saveCashGoal(cash) {
  document.cookie = `cashGoal = ${cash}`;
}

function saveCashAsset(cash) {
  document.cookie = `cashAsset = ${cash}`;
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
function getTotalGoal() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)totalGoal\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}
function getCashGoal() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)cashGoal\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}
function getCashAsset() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)cashAsset\s*=\s*([^;]*).*$)|^.*$/,
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
function getBanksCookie() {
  // cookie에 저장된 bankAsset 불러와 변수 선언.
  let getbankasset = getBankAsset();
  let bankArr = getbankasset
    .split(/{/)
    .map(ele => ele.replace(/}/g, ''))
    .splice(1, getbankasset.length);
  return bankArr;
}
function getBanksCookieBank() {
  let bankArr = getBanksCookie();

  let storeBankArr = [];
  for (let i = 0; i < bankArr.length; i++) {
    let bank = bankArr[i].slice(
      bankArr[i].indexOf('bank') + 7,
      bankArr[i].indexOf('asset') - 3,
    );
    storeBankArr.push(bank);
  }
  return storeBankArr;
}
function getBanksCookieAsset() {
  let bankArr = getBanksCookie();

  let storeAssetArr = [];
  for (let i = 0; i < bankArr.length; i++) {
    let asset = bankArr[i].slice(
      bankArr[i].indexOf('asset') + 8,
      bankArr[i].indexOf('id') - 3,
    );
    storeAssetArr.push(asset);
  }
  return storeAssetArr;
}
function getBanksCookieId() {
  let bankArr = getBanksCookie();

  let storeIdArr = [];
  for (let i = 0; i < bankArr.length; i++) {
    let id = bankArr[i].slice(
      bankArr[i].indexOf('id') + 5,
      bankArr[i].indexOf('-') + 5,
    );
    storeIdArr.push(id);
  }
  return storeIdArr;
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

  return categoryArr;
}
function getCategoryCookieName() {
  let categoryArr = getCategoryCookie();

  let categoryName = [];
  // *** 3. 카테고리명과 아이콘주소를 모은 각각의 배열 생성 ***
  for (let i = 0; i < categoryArr.length; i++) {
    categoryName.push(categoryArr[i].slice(0, categoryArr[i].indexOf('|')));
  }
  return categoryName;
}
function getCategoryCookieIcon() {
  let categoryArr = getCategoryCookie();

  let categoryIcon = [];
  // *** 3. 카테고리명과 아이콘주소를 모은 각각의 배열 생성 ***
  for (let i = 0; i < categoryArr.length; i++) {
    let iconId = categoryArr[i].slice(
      categoryArr[i].indexOf('|') + 1,
      categoryArr[i].legnth,
    );
    categoryIcon.push(
      iconId.replace(iconId.substr(iconId.indexOf('|'), iconId.length), ''),
    );
  }
  return categoryIcon;
}
function getCategoryCookieId() {
  let categoryArr = getCategoryCookie();

  let categoryId = [];
  // *** 3. 카테고리명과 아이콘주소를 모은 각각의 배열 생성 ***
  for (let i = 0; i < categoryArr.length; i++) {
    let iconId = categoryArr[i].slice(
      categoryArr[i].indexOf('|') + 1,
      categoryArr[i].legnth,
    );
    categoryId.push(iconId.slice(iconId.indexOf('|') + 1, iconId.length));
  }
  return categoryId;
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

function deleteListCookie(value) {
  let listData = checkListData();
  // JSON.parse(listData);
  console.log(value);
  console.log(listData);

  let sortListData = listData.split(/{/).map(a => a.replace(/}/g, ''));
  sortListData.splice('', 1);
  for (let i = 0; i < sortListData.length; i++) {
    sortListData[i] = eval('({' + sortListData[i] + '})');
    console.log(sortListData[i]);

    if (sortListData[i].id == value.id) {
      console.log(i);
      sortListData.splice([i], 1);
    }
    // sortListData = JSON.stringify(sortListData[i]);
    // sortListData = toString(sortListData[i]);
  }

  console.log(sortListData);

  // document.cookie = `${JSON.stringify(
  //   value,
  // )}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  document.cookie = `listData=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  // saveListData(sortListData[0]);
  // console.log(value);

  // let delList = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  // console.log(delList);
}

export {
  saveTotalGoal,
  saveCashGoal,
  saveCashAsset,
  saveBankAsset,
  saveCategory,
  saveListData,
  getTotalGoal,
  getCashGoal,
  getCashAsset,
  getBankAsset,
  getBanksCookie,
  getBanksCookieBank,
  getBanksCookieAsset,
  getBanksCookieId,
  getCategory,
  getCategoryCookie,
  getCategoryCookieName,
  getCategoryCookieIcon,
  getCategoryCookieId,
  getListData,
  deleteCookie,
  saveAuth,
  getUserEmail,
  getAuthUid,
  deleteListCookie,
};
