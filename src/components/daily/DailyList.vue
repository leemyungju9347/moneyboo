<template>
  <div class="daily-list">
    <ul class="daily-list-cont">
      {{
        listArray
      }}
      <li class="daily-list-day" v-for="date in sortListDate()" :key="date">
        <strong class="font-uto">{{ date }}</strong>
        <em class="daily-list-income"
          >수입 : <b class="list-income">{{ checkDayIncome(date) }}원</b></em
        >
        <em class="daily-list-expend"
          >지출 : <b class="list-expend">{{ checkDayExpend(date) }}원</b></em
        >
        <ul v-for="list in listArray" :key="list.index">
          <li v-if="list.date == date">
            <i>{{ list.category }}</i>
            <span class="font-uto"> {{ list.bank }} </span>
            <b v-if="list.item === 'income'"
              ><a href="#/daily" title="수정하기" class="list-income"
                >+ {{ addComma(list.price) }} 원</a
              ></b
            >
            <b class="list-expend" v-else>
              <a href="#/daily" title="수정하기" class="list-expend">
                - {{ addComma(list.price) }} 원</a
              >
            </b>
            <button class="btn list-delete">
              <i class="fas fa-times"></i>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { addComma } from '@/utils/filters';

export default {
  data() {
    return {
      listArray: this.$store.state.listData,
      listDateArray: [],
      // 왜 새로고침을 해야 반영이 될까? ( 쿠키에 저장하기만하고 스토어에 저장 안할때)
    };
  },
  methods: {
    // 날짜 정렬 함수
    sortListDate() {
      // 저장된 객체가 없으면 리턴해서 나가라.
      if (!this.listArray) return;

      let copyListArray = this.listArray;
      let dateArray = [];

      // date만 dateArray 에 할당한다.
      for (let i = 0; i < copyListArray.length; i++) {
        dateArray[i] = copyListArray[i].date;
      }
      // dateArray, 즉 입력값이 하나면 그대로 dateArray에 담고 나가라.
      if (dateArray.length == 1) {
        return (this.listDateArray = dateArray);
      }
      // 1개 이상이라면 내림차순으로 정렬한다. ( 최근 리스트가 가장 위로 올라오게 하기 위함)
      dateArray.sort(function(a, b) {
        return b - a;
      });
      // 중복값 제거
      for (let i = 1; i <= dateArray.length; i++) {
        if (dateArray[i] == dateArray[i - 1]) {
          // 값이 같다면 지워라
          this.listDateArray = dateArray.splice(i, 1);
        }
      }
      // 중복값이 없다면 this.listDateArray 에 할당후 함수를 빠져나가라.
      return (this.listDateArray = dateArray);
    },
    // 하루 수입 확인 함수
    checkDayIncome(date) {
      let ddd = this.listArray;
      let totalPrice = 0;
      for (let i = 0; i < ddd.length; i++) {
        if (ddd[i].item === 'income' && ddd[i].date === date) {
          let ppp = Number(ddd[i].price);
          totalPrice += ppp;
        }
      }
      return addComma(totalPrice);
    },
    // 하루 지출 확인 함수
    checkDayExpend(date) {
      let ddd = this.listArray;
      let totalPrice = 0;
      for (let i = 0; i < ddd.length; i++) {
        if (ddd[i].item === 'expend' && ddd[i].date === date) {
          let ppp = Number(ddd[i].price);
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
