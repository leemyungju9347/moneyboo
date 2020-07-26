// 숫자에 콤마 붙여주는 함수
function addComma(price) {
  let returnPrice = Number(price).toLocaleString();
  return returnPrice;
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

export { addComma, conversionDateId, createId };
