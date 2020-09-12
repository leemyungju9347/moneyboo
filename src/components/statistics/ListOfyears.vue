<template>
  <div class="statistics-list-cont">
    <div id="yearList" class="statistics-list">
      <ul>
        <li>
          <b>{{}}</b>
          <span>{{}} 원</span>
        </li>
      </ul>
    </div>
    {{ yearsExpend }}
  </div>
</template>

<script>
import { addComma } from '@/utils/filters';
import { moneybooRef } from '@/api/firestore';
export default {
  data() {
    return {
      currentUID: '',
      yearsList: [],
      yearsExpend: [],
    };
  },
  created() {
    this.currentUID = this.$store.state.uid;
    // this.getDailyList();
    this.getDailyDB();
    addComma();
  },
  methods: {
    //1. 데이터를 폴더 별로 불러온다
    //2. 해당 폴더의 수입 지출 을 각각 계산해준다(한달 기준)(일단 지출을 해본후 구현가능 하다면 수입항목도 넣어보자.)
    //3. 해당 월을 클릭했을경우 round-graph에 반영이 되게 해준다.
    //4. plugin에 적용을 시킨다.
    //5. 폴더명앞에  년도의 뒷부분과 일치한 폴더 명만 가져온다. (20.08폴더 명이 이렇게 되어있음.)
    mBooRef() {
      return moneybooRef(this.currentUID);
    },
    getDailyDB() {
      this.mBooRef()
        .doc('daily')
        .collection('listAdd')
        .onSnapshot(snapShot => {
          snapShot.forEach(doc => {
            this.yearsList.push(doc.data().listData);
          });
          this.calculateEP();
        });
    },
    // 1년 중 월별 총 지출
    calculateEP() {
      const yearsDB = this.yearsList;
      let expendLT = [];
      let expendList = {
        month: 0,
        expend: 0,
      };
      for (let i = 0; i < yearsDB.length; i++) {
        yearsDB[i].map(el => {
          if (el.item === 'expend') {
            const price = el.price;
            const date = el.date.substr(0, 1);

            if (date) {
              expendList.month = Number(date);
              expendList.expend += Number(price);
            }
          }
        });
        expendLT.push(expendList);
        // console.log(expendLT);
        // log를 찍을 때에는 월별로 객체에 나뉘어 나왔는데 왜 배열에 담으면9 월의 값만 담기는 거지..?
      }
    },
  },
};
</script>

<style></style>
