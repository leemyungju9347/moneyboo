<template>
  <!-- 가영  mainpage -->
  <!-- /main  -->
  <div class="asset-list-form">
    <!-- 총자산 1.현금카드전부더한거 2.현금따로 3.카드따로 -->
    <form @submit.prevent="submitForm">
      <div class="total-asset-cont">
        <strong>총 자산</strong>
        <b class="ani-money">0000원</b>
      </div>

      <div class="credit-asset-cont">
        <em>카드</em>
        <ul>
          <li>
            <span>신한카드</span>
            <b class="ani-money">50,000원</b>
          </li>
          <li>
            <span>하나카드</span>
            <b class="ani-money">50,000원</b>
          </li>
        </ul>
      </div>

      <div class="cash-asset-cont">
        <em>현금</em>
        <b class="ani-money">10,000 원</b>
      </div>
      <button type="submit" class="btn"></button>
    </form>
  </div>
</template>

<script>
export default {
  // created(){
  // },
  methods: {
    submitForm() {
      this.$router.push('/daily');
      console.log("it's works!");
    },
  },
};
</script>

<style></style>
