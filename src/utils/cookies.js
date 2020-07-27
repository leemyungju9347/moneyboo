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
function getCategory() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)category\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
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
  getCategory,
  getListData,
  deleteCookie,
};
