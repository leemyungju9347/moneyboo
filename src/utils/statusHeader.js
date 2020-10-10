// 지출값 더하는 함수 (로딩바)
function addExpend(data) {
  const copyList = data;
  let totalPrice = 0;

  if (!copyList) return;
  for (let i = 0; i < copyList.length; i++) {
    if (copyList[i].item == 'expend') {
      let stringToNumber = Number(copyList[i].price);
      totalPrice += stringToNumber;
    }
  }
  return totalPrice;
}

// 목표금액 퍼센트 계산 함수
function totalGoalPercent(expendPrice, totalPrcie) {
  let percent = 100;
  if (expendPrice >= totalPrcie) {
    totalPrcie = percent;
    return 100;
  }
  percent = (expendPrice / totalPrcie) * 100;
  percent = percent.toFixed(0);
  return percent;
}

// 퍼센트에 따른 이모티콘 변화 함수
function checkIconCondition(totalPercent) {
  if (totalPercent <= 15 || totalPercent == 0) {
    return 'emo-first';
  } else if (totalPercent <= 30) {
    return 'emo-second';
  } else if (totalPercent <= 50) {
    return 'emo-third';
  } else if (totalPercent <= 65) {
    return 'emo-fourth';
  } else if (totalPercent <= 80) {
    return 'emo-fifth';
  } else if (totalPercent <= 99) {
    return 'emo-sixth';
  } else return 'emo-seventh';
}

// 퍼센트에 따른 로딩바의 css 변화
function printLoadingBar(totalPercent, expendPrice, totalGoal) {
  let barWidth = totalPercent * 1.8;
  if (expendPrice >= totalGoal) {
    return { width: '186px' };
  } else {
    return { width: `${barWidth}px` };
  }
}

export { addExpend, totalGoalPercent, checkIconCondition, printLoadingBar };
