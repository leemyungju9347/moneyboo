import { addComma } from '@/utils/filters';

// 🥵mbooRef, dailyListAddRef, getListData,submitEditList 는 오류를 토해낸다...
// 데이터불러오는 함수를 정리해야.. 깔끔해질것같은데..!!!

// 날짜별로 정렬하는 함수
function sortListDate(data) {
  // 저장된 객체가 없으면 리턴해서 나가라.
  if (!data) return;

  let copyListArray = data;
  let dateArray = [];

  // date만 dateArray 에 할당, '.'을 기준으로 뒷 자리만 dateArray 에 담는다.
  for (let i = 0; i < copyListArray.length; i++) {
    dateArray[i] = copyListArray[i].date.split('.')[1];
  }
  // dateArray, 즉 입력값이 하나면 그대로 dateArray에 담고 나가라.
  if (dateArray.length == 1) {
    return dateArray;
  }
  // 1개 이상이라면 내림차순으로 정렬한다. ( 최근 리스트가 가장 위로 올라오게 하기 위함)
  dateArray.sort(function(a, b) {
    return b - a;
  });
  // 중복값 제거 ( 중복값 세개이상일때 예외처리 해야함)
  for (let i = 0; i < dateArray.length; i++) {
    if (dateArray[i] === dateArray[i - 1]) {
      // 값이 같다면 지워라
      dateArray.splice(i, 1);
      // 위에서 splice 로 중복값을 지워줬기 때문에 i값도 빼줘야 dateArray를 순차적으로 돌수있다.
      i--;
    }
  }
  // 중복값이 없다면 this.listDateArray 에 할당후 함수를 빠져나가라.
  return dateArray;
}

// date 에 맞는 list 만 불러오는 함수
function checkMatchDateList(date, data) {
  if (!data) return;
  let copyListArray = data;
  let pushArray = [];
  for (let i = 0; i < copyListArray.length; i++) {
    if (date === copyListArray[i].date.split('.')[1]) {
      pushArray.push(copyListArray[i]);
    }
  }
  return pushArray;
}

// 출력날짜 정리 함수
function conversionDate(date) {
  // 저장되는 날짜를 한국기준으로 정리해서 저장.
  let month = date.getMonth();
  let todayDate = date.getDate();

  return `${month + 1}.${todayDate}`;
  // 출력 형식 : 7.17
}

// 오늘의 수입, 지출 계산하는 함수
function checkDayItem({ date, item, data, to }) {
  let copyListData = data;
  let totalPrice = 0;
  if (!copyListData) return;
  for (let i = 0; i < copyListData.length; i++) {
    //   만약 balance 컴포넌트에서 왔다면, 오늘에 해당하는 값만 다 더해라.
    if (
      to == 'balance' &&
      copyListData[i].date == date &&
      copyListData[i].item == item
    ) {
      let addPrice = Number(copyListData[i].price);
      totalPrice += addPrice;
    } else if (
      // 만약 list 컴포넌트에서 왔다면, 날짜별로 값을 더해라
      to == 'list' &&
      copyListData[i].item === item &&
      copyListData[i].date.split('.')[1] === date
    ) {
      let stringToNumber = Number(copyListData[i].price);
      totalPrice += stringToNumber;
    }
  }
  return addComma(totalPrice);
}

// 금액입력 인풋창에 값을 입력하지 않았을때 확인하는 함수
function checkEmptyList(category, bank, price) {
  if (
    category === '' ||
    bank === '' ||
    price === null ||
    price == ' ' ||
    price == 0
  ) {
    alert('값을 선택 입력해 주세요.');
    return true;
  } else return false;
}

// 금액입력 인풋창에 숫자가 맞는지 확인 함수
function checkPriceNumber(price) {
  // 숫자가 아니면 alert 창을 띄워라
  if (isNaN(price)) {
    alert('숫자만 입력해주세요');
    return true;
  } else return false;
}

// firestore에 저장할때 20.09 이런식으로 변환해주는 함수
function selectDateConversionMonth(date) {
  const year = String(new Date(date).getFullYear()).substr(2, 2);

  const month =
    new Date(date).getMonth() < 10
      ? `0${new Date(date).getMonth() + 1}`
      : new Date(date).getMonth() + 1;

  return `${year}.${month}`;
}

// 카테고리 이름을 아이콘으로 변경해주는함수
function convertIntoIcon(category, categoryData) {
  let copyCategorys = categoryData;
  let categoryIconNum = 0;

  for (let i = 0; i < copyCategorys.length; i++) {
    if (copyCategorys[i].name == category) {
      categoryIconNum = i;
      // 같은걸 찾으면 바로 return 해줘라
      return copyCategorys[categoryIconNum].icon;
    }
  }
}

export {
  sortListDate,
  checkMatchDateList,
  conversionDate,
  checkDayItem,
  checkEmptyList,
  checkPriceNumber,
  selectDateConversionMonth,
  convertIntoIcon,
};
