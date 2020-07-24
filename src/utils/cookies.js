// SetAsset.vue
function saveTotal(total) {
  console.log(total);
  document.cookie = `totalGoal = ${total}`;
}

function saveCash(cash) {
  document.cookie = `cashGoal = ${cash}`;
}

function saveBankAsset(bankAsset) {
  document.cookie = `bankAsset = ${bankAsset}`;
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
  // let array = JSON.stringify(newList);
  if (!getListData()) {
    document.cookie = `listData = ${JSON.stringify(newList)}`;
  } else if (getListData()) {
    document.cookie = `listData = ${getListData()}${JSON.stringify(newList)}`;
  }
}
//  이렇게 되면 배열안에 객체가 아니라서, 이상하게 for문을 돌게된다.

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
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)listData\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
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
};
