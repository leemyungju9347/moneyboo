<template>
  <!-- /main  -->
  <div class="asset-list-form">
    <form @submit.prevent="submitForm">
      <!-- 총자산 -->
      <div class="total-asset-cont">
        <strong>총 자산</strong>
        <b id="ani-money">0000원</b>
      </div>
      <!-- 카드 -->
      <div class="credit-asset-cont">
        <em>카드</em>
        <ul>
          <li>
            <span>신한카드</span>
            <b id="ani-money">50,000원</b>
          </li>
          <li>
            <span>하나카드</span>
            <b id="ani-money">50,000원</b>
          </li>
        </ul>
      </div>
      <!-- 현금 -->
      <div class="cash-asset-cont">
        <em>현금</em>
        <b id="ani-money">10,000 원</b>
      </div>

      <button type="submit" class="btn big main">추가</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    submitForm() {
      this.$router.push('/daily');
    },
    aniMoney(time) {
      const movingMoney = time.textContent;
      console.log(movingMoney);

      // time.textContent = '';

      // for (str of movingMoney) {
      //   let newI = document.createElement('i');

      //   if (str === '') {
      //     str = '&nbsp';
      //   }
      // }
      // newI.innerHtml = str;

      // delayTime = delayTime + time / movingMoney.length;
      // newI.style.animationDelay = `${delayTime}s`;
      // money.appendChild(newI);
    },
  },
};
</script>

<style></style>
