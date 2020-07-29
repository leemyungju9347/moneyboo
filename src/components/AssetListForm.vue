<template>
  <!-- /main  -->
  <div class="asset-list-form">
    <form>
      <!-- 총자산 -->
      <div class="total-asset-cont">
        <strong>총 자산</strong>
        <b id="ani-money">{{ makeComma(assetTotal) }} 원</b>
      </div>
      <!-- 카드 -->
      <div class="credit-asset-cont">
        <em>카드</em>
        <ul>
          <li v-for="nInfo in bankArr" :key="nInfo.id">
            <span>{{ nInfo.bank }}</span>
            <b id="ani-money">{{ makeComma(nInfo.asset) }}원</b>
          </li>
        </ul>
      </div>
      <!-- 현금 -->
      <div class="cash-asset-cont">
        <em>현금</em>
        <b id="ani-money">{{ makeComma(cash) }} 원</b>
      </div>

      <button @click="addBtn" class="btn big main">추가</button>
    </form>
  </div>
</template>

<script>
import { addComma } from '@/utils/filters.js';

export default {
  data() {
    return {
      assetTotal: '',
      cash: this.$store.state.cashGoal,
      bankArr: [],
    };
  },
  created() {
    let bank = this.$store.state.bankAsset.bank,
      asset = this.$store.state.bankAsset.asset,
      id = this.$store.state.bankAsset.id;

    // 은행의 배열을 각각의 객체로 만드는 로직
    for (let i = 0; i < bank.length; i++) {
      this.bankArr.push({
        bank: bank[i],
        asset: asset[i],
        id: id[i],
      });
    }

    this.totalCalculate();
  },
  computed: {},
  methods: {
    addBtn() {
      this.$router.push('/daily');
    },
    makeComma(val) {
      return addComma(val);
    },
    // 총 자산 계산
    totalCalculate() {
      let assets = this.$store.state.bankAsset.asset;

      let totalBank = assets.reduce((a, b) => a * 1 + b * 1);

      this.assetTotal = this.cash * 1 + totalBank;
    },
  },
};
</script>

<style></style>
