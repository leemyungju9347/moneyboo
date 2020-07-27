<template>
  <div class="daily-balance">
    <ul class="daily-balance-cont font-jua">
      <li>
        오늘의 수입<b>{{ incomeToday(date) }}원</b>
      </li>
      <li>
        오늘의 지출<b>{{ expendToday(date) }}원</b>
      </li>
    </ul>
    {{ date }}
  </div>
</template>

<script>
import { addComma } from '@/utils/filters';
export default {
  data() {
    return {
      listData: this.$store.state.listData,
      date: this.conversionDate(new Date()),
    };
  },
  methods: {
    // 날짜 정렬
    conversionDate(date) {
      // 저장되는 날짜를 한국기준으로 정리해서 저장.
      let month = date.getMonth();
      let todayDate = date.getDate();

      return `${month + 1}.${todayDate}`;
      // 출력 형식 : 7.17
    },
    // 오늘의 수입 확인 함수
    incomeToday(date) {
      let copyListData = this.listData;
      let totalPrice = 0;
      for (let i = 0; i < copyListData.length; i++) {
        if (copyListData[i].date == date && copyListData[i].item == 'income') {
          let ppp = Number(copyListData[i].price);
          totalPrice += ppp;
        }
      }
      return addComma(totalPrice);
    },
    // 오늘의 지출 확인 함수
    expendToday(date) {
      let copyListData = this.listData;
      let totalPrice = 0;
      for (let i = 0; i < copyListData.length; i++) {
        if (copyListData[i].date == date && copyListData[i].item == 'expend') {
          let ppp = Number(copyListData[i].price);
          totalPrice += ppp;
        }
      }
      return addComma(totalPrice);
    },
    // 숫자에 콤마 붙여주는 함수
    addComma(price) {
      return Number(price).toLocaleString();
    },
  },
};
</script>

<style></style>
