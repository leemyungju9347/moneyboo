<template>
  <div class="status-form">
    <!-- 상태 아이콘 -->
    <div class="status-icon-cont">
      <i v-bind:class="checkIconCondition()"></i>
    </div>
    <!-- 로딩 바 -->
    <div class="loading-bar-cont">
      <div class="loading-bar" v-bind:style="printLoadingBar()">
        <b class="bar-number" v-bind:class="{ 'low-bar': totalPercent < 30 }"
          >{{ totalGoalPercent() }}%</b
        >
      </div>
    </div>
  </div>
</template>

<script>
// import { getTotal } from '@/utils/cookies';
export default {
  created() {
    // 목표금액 불러오기
    this.totalGoal = this.$store.state.totalGoal;
    // listData 불러오기
    this.listArray = this.$store.state.listData;
    // 리스트를 복제
    let copyList = this.listArray;
    let totalPrice = 0;
    // 이번달을 찾고
    let date = new Date();
    this.month = date.getMonth() + 1;
    // 리스트의 날짜중 이번달에 해당하면서 지출인 애들을 totalPrice에 담는다.
    for (let i = 0; i < copyList.length; i++) {
      let checkMonth = copyList[i].date.split('.');
      if (checkMonth[0] == this.month && copyList[i].item == 'expend') {
        let stringToNumber = Number(copyList[i].price);
        totalPrice += stringToNumber;
      }
    }
    // totalExpendPrice 에 할당해준다.
    this.totalExpendPrice = totalPrice;
  },
  data() {
    return {
      listArray: [],
      totalGoal: 0,
      month: 0,
      totalExpendPrice: 0,
      totalPercent: 0,
    };
  },
  methods: {
    // whatMonth() {
    //   let date = new Date();
    //   this.month = date.getMonth() + 1;
    // },
    // selectExpendList() {
    //   let copyList = this.listArray;
    //   let totalPrice = 0;
    //   for (let i = 0; i < copyList.length; i++) {
    //     let checkMonth = copyList[i].date.split('.');
    //     if (checkMonth[0] == this.month) {

    //       let stringToNumber = Number(copyList[i].price);
    //       totalPrice += stringToNumber;
    //     }
    //   }

    //   return (this.totalExpendPrice = totalPrice);
    // },
    totalGoalPercent() {
      // 목표금액 퍼센트 계산
      let percent = 100;
      if (this.totalExpendPrice >= this.totalGoal) {
        this.totalPercent = percent;
        return 100;
      }
      percent = (this.totalExpendPrice / this.totalGoal) * 100;
      percent = percent.toFixed(0);
      this.totalPercent = percent;
      return this.totalPercent;
    },
    checkIconCondition() {
      // 퍼센트에 따른 이모티콘 변화
      if (this.totalPercent <= 15 || this.totalPercent == 0) {
        return 'emo-first';
      } else if (this.totalPercent <= 30) {
        return 'emo-second';
      } else if (this.totalPercent <= 50) {
        return 'emo-third';
      } else if (this.totalPercent <= 65) {
        return 'emo-fourth';
      } else if (this.totalPercent <= 80) {
        return 'emo-fifth';
      } else if (this.totalPercent <= 99) {
        return 'emo-sixth';
      } else return 'emo-seventh';
    },
    printLoadingBar() {
      // 퍼센트에 따른 로딩바의 변화
      let barWidth = this.totalPercent * 1.8;
      if (this.totalExpendPrice >= this.totalGoal) {
        return { width: '186px' };
      } else {
        return { width: `${barWidth}px` };
      }
    },
  },
};
</script>

<style></style>
