// 몇월 인지 확인.
function todayCheck() {
  let date = new Date();
  let month = date.getMonth();

  let monthCh = month + 1;

  return monthCh;
}

//  현재 몇년도 인지 확인.
function yearCheck() {
  let date = new Date();
  let year = date.getFullYear();

  return year;
}

export { todayCheck, yearCheck };
