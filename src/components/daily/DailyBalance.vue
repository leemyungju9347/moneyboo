<template>
  <div class="daily-balance">
    <ul class="daily-balance-cont font-jua">
      <li>
        오늘의 수입<b>{{ checkTodayPrice(date, 'income') }}원</b>
      </li>
      <li>
        오늘의 지출<b>{{ checkTodayPrice(date, 'expend') }}원</b>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { addComma, newConversionMonth } from '@/utils/filters';
import { moneybooRef } from '@/api/firestore';

export default {
  created() {
    this.getListData();
  },
  computed: {
    ...mapState(['uid']), // 현재 로그인한 유저 uid
  },
  data() {
    return {
      date: this.conversionDate(new Date()),
      listArrLength: 0,
      getAllListData: [],
      allIncome: 0,
    };
  },
  methods: {
    // firestore에 있는 저장된 DB를 가져오는 함수
    getListData() {
      const yearsMonth = newConversionMonth();
      // listAdd collection 하위에 있는 document 전체를 불러옴
      this.dailyListAddRef()
        .doc(yearsMonth)
        .onSnapshot(snapshot => {
          snapshot.exists
            ? (this.getAllListData = snapshot.data().listData)
            : console.log('값이 없습니다!');
        });
    },
    // listAdd collection 참조 값
    dailyListAddRef() {
      return this.mbooRef()
        .doc('daily')
        .collection('listAdd');
    },
    mbooRef() {
      return moneybooRef(this.uid);
    },
    // 날짜 정렬
    conversionDate(date) {
      // 저장되는 날짜를 한국기준으로 정리해서 저장.
      let month = date.getMonth();
      let todayDate = date.getDate();

      return `${month + 1}.${todayDate}`;
      // 출력 형식 : 7.17
    },
    // 오늘의 수입 & 지출 확인 함수
    checkTodayPrice(date, item) {
      let copyListData = this.getAllListData;
      let totalPrice = 0;
      if (!copyListData) return;
      for (let i = 0; i < copyListData.length; i++) {
        if (copyListData[i].date == date && copyListData[i].item == item) {
          let ppp = Number(copyListData[i].price);
          totalPrice += ppp;
        }
      }
      return addComma(totalPrice);
    },
  },
};
</script>

<style></style>
