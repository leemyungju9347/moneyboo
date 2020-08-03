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

// 해당 월 & 지출 필터
// function categoryTotal(lists, month) {
//   lists.filter(val => {
//     let item = val.item;
//     let date = Number(val.date.split('')[0]);

//     return date == month && item == 'expend';
//   });
// }

export { todayCheck, yearCheck };
