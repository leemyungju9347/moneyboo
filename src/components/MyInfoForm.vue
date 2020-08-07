<template>
  <div class="myinfo-form">
    <div class="status-inform-cont">
      <!-- 현재 목표 도달 상태를 보여주는 이모티콘 -->
      <div>
        <i v-bind:class="checkIconCondition()"></i>
        <!-- <i class="far fa-laugh"></i> -->
      </div>

      <ul>
        <li>
          ID
          <span>{{ id }}</span>
          <!-- <span>asdfger12345</span> -->
        </li>
        <li>
          Nickname
          <span>hello12345</span>
        </li>
      </ul>
      <!-- <span>ID : {{}}</span>
    <span>Nickname : {{}}</span> -->
    </div>

    <!-- setting페이지로 연결버튼 -->
    <button @click="clickMove()">Setting</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$store.state.email,
      totalGoal: 0,
      totalExpendPrice: 0,
      totalPercent: 0,
    };
  },
  created() {
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
  methods: {
    clickMove() {
      this.$router.push('/setting');
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
  },
};
</script>

<style></style>
