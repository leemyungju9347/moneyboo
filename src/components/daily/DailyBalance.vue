<template>
  <div class="daily-balance">
    <ul class="daily-balance-cont font-jua">
      <li>
        오늘의 수입<b>{{ callCheckDayItem('income') }}원</b>
      </li>
      <li>
        오늘의 지출<b>{{ callCheckDayItem('expend') }}원</b>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { newConversionMonth } from '@/utils/filters';
import { moneybooRef } from '@/api/firestore';
import { conversionDate, checkDayItem } from '@/utils/daily.js';

export default {
  created() {
    this.getListData(this.uid);
  },
  computed: {
    ...mapState(['uid']), // 현재 로그인한 유저 uid
  },
  data() {
    return {
      date: conversionDate(new Date()),
      listArrLength: 0,
      getAllListData: [],
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
    // 오늘의 수입과 지출을 가져오는 함수
    callCheckDayItem(item) {
      return checkDayItem({
        date: this.date,
        item: item,
        data: this.getAllListData,
        to: 'balance',
      });
    },
  },
};
</script>

<style></style>
