<template>
  <div class="status-form">
    <!-- 상태 아이콘 -->
    <div class="status-icon-cont">
      <i v-bind:class="checkGoalCondition()"></i>
    </div>
    <!-- 로딩 바 -->
    <div class="loading-bar-cont">
      <div class="loading-bar" v-bind:class="checkGoalCondition()">
        {{ totalGoalPercent() }}%
      </div>
    </div>
  </div>
</template>

<script>
// import { getTotal } from '@/utils/cookies';
export default {
  created() {
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
      saveAsset: {
        total: this.$store.state.totalGoal,
        cash: this.$store.state.cashGoal,
        banks: [],
      },
      totalGoal: Number(this.$store.state.total),
      month: 0,
      totalExpendPrice: 0,
    };
  },
  methods: {
    whatMonth() {
      let date = new Date();
      this.month = date.getMonth() + 1;
    },
    selectExpendList() {
      let copyList = this.listArray;
      let totalPrice = 0;
      for (let i = 0; i < copyList.length; i++) {
        let checkMonth = copyList[i].date.split('.');
        if (checkMonth[0] == this.month) {
          let stringToNumber = Number(copyList[i].price);
          totalPrice += stringToNumber;
        }
      }

      return (this.totalExpendPrice = totalPrice);
    },
    totalGoalPercent() {
      return (this.totalExpendPrice / this.totalGoal) * 100;
    },
    checkGoalCondition() {
      let percent = this.totalGoalPercent();
      if (percent <= 15) {
        return 'emo-first';
      } else if (percent <= 30) {
        return 'emo-second';
      } else if (percent <= 50) {
        return 'emo-third';
      } else if (percent <= 65) {
        return 'emo-fourth';
      } else if (percent <= 80) {
        return 'emo-fifth';
      } else if (percent <= 99) {
        return 'emo-sixth';
      } else return 'emo-seventh';
    },
  },
};
</script>

<style></style>
