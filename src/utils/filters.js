// ------ 숫자에 콤마 붙여주는 함수 ------
function addComma(price) {
  return Number(price).toLocaleString();
}

// ------ cookie에 저장할 때 부여해줄 id 생성 ------
function makeID(type) {
  // date 구함.
  let year = String(new Date().getFullYear()).substr(2, 2);
  let month =
    new Date().getMonth() < 10
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1;
  let date =
    new Date().getDate() < 10
      ? `0${new Date().getDate()}`
      : new Date().getDate();

  let hh = new Date().getHours().toString();
  let mm = new Date().getMinutes().toString();
  let ss = new Date().getSeconds().toString();

  const nowTime = `${hh < 10 ? `0${hh}` : hh}${mm < 10 ? `0${mm}` : mm}${
    ss < 10 ? `0${ss}` : ss
  } `;

  // type구함.
  type === 'category' ? (type = 'c') : type === 'bank' ? (type = 'b') : 'l';

  // type + date + 시분초 조합해 id생성.
  let idDate = `${type}${year}${month}${date}-${nowTime}`;
  console.log(idDate);

  return idDate;
}

// ------ cookie에 저장할 때 부여해줄 id 생성 ------
function makeDateListID(type, selectDate) {
  // date 구함.
  let year = String(selectDate.getFullYear()).substr(2, 2);
  let month =
    selectDate.getMonth() < 10
      ? `0${selectDate.getMonth() + 1}`
      : selectDate.getMonth() + 1;
  let date =
    selectDate.getDate() < 10
      ? `0${selectDate.getDate()}`
      : selectDate.getDate();

  let hh = new Date().getHours().toString();
  let mm = new Date().getMinutes().toString();
  let ss = new Date().getSeconds().toString();

  const nowTime = `${hh < 10 ? `0${hh}` : hh}${mm < 10 ? `0${mm}` : mm}${
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

// yyyy-mm-dd 형식의 날짜 포맷
function dateFormat(date) {
  let year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : '0' + month;
  let day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return `${year}-${month}-${day}`;
}

export { addComma, makeID, makeDateListID, newConversionMonth, dateFormat };
