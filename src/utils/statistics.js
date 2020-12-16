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

function sortCategory(arr, value) {
  arr.sort((a, b) => {
    // 한글 오름차순
    return a[value] < b[value] ? -1 : a[value] > b[value] ? 1 : 0;
  });
}

export { todayCheck, yearCheck, sortCategory };
