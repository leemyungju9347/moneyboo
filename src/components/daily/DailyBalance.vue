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
  </div>
</template>

<script>
import { addComma, newConversionMonth } from '@/utils/filters';
import { moneybooRef } from '@/api/firebase';

export default {
  created() {
    this.getListData();
  },
  data() {
    return {
      listData: this.$store.state.listData,
      date: this.conversionDate(new Date()),
      currentUid: this.$store.state.uid, // 현재 로그인한 유저 uid
      listArrLength: 0,
      getAllListData: [],
    };
  },
  methods: {
    // firestore에 있는 저장된 DB를 가져오는 함수
    getListData() {
      const yearsMonth = newConversionMonth();
      let pushArray = [];
      // listAdd collection 하위에 있는 document 전체를 불러옴
      this.dailyListAddRef()
        .get()
        .then(querySnapshot => {
          const docSnapshot = querySnapshot.docs;
          this.listArrLength = querySnapshot.size; // 문서의 값이 있는지 없는지 판단해서 처리할 용도

          // 데이터가 생성되지 않았을 경우
          if (querySnapshot.empty) {
            this.logMessage = '등록한 내역이 없습니다!!';

            // 데이터가 있을 경우 실행
          } else {
            this.logMessage = ''; // 로그메세지 리셋
            // document 출력

            docSnapshot.forEach(doc => {
              // 현재의 달에 해당하는 것만 담는다
              if (doc.id == yearsMonth) {
                pushArray.push(doc.data().listData);
              }
            });
          }
          // 이렇게 하는 이유가 배열안에 배열을 방지하기 위해서
          this.getAllListData = pushArray[0];
        })
        .catch(err => {
          console.log('위치는 DailyList 메쏘드', err);
        });
    },
    // listAdd collection 참조 값
    dailyListAddRef() {
      return this.mbooRef()
        .doc('daily')
        .collection('listAdd');
    },
    mbooRef() {
      return moneybooRef(this.currentUid);
    },
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
      let copyListData = this.getAllListData;
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
      let copyListData = this.getAllListData;
      let totalPrice = 0;
      for (let i = 0; i < copyListData.length; i++) {
        if (copyListData[i].date == date && copyListData[i].item == 'expend') {
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
