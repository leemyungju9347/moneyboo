<template>
  <!-- /main  -->
  <div class="asset-list-form">
    <form>
      <!-- 총자산 -->
      <div class="total-asset-cont">
        <strong>총 자산</strong>
        <b id="ani-money">{{}} 원</b>
      </div>
      <!-- 카드 -->
      <div class="credit-asset-cont">
        <em>카드</em>
        <ul>
          <li v-for="bInfo in bankAsset.bank" :key="bInfo.id">
            <span>{{ bInfo }}</span>
            <b id="ani-money">{{ bInfo.asset }}원</b>
          </li>
        </ul>
      </div>
      <!-- 현금 -->
      <div class="cash-asset-cont">
        <em>현금</em>
        <b id="ani-money">{{ assetList.cash }} 원</b>
      </div>

      <button @click="addBtn" class="btn big main">추가</button>
    </form>
  </div>
</template>

<script>
// import { addComma } from '@/utils/filters.js';
import { getBanksCookie } from '@/utils/cookies.js';

export default {
  data() {
    return {
      assetTotal: '',
      assetList: {
        total: this.$store.state.totalGoal,
        cash: this.$store.state.cashGoal,
        banks: [],
      },
      bankAsset: this.$store.state.bankAsset,
    };
  },
  created() {
    getBanksCookie(this.assetList);
  },
  comoputed: {
    // assetCalculate() {
    //   return this.assetTotal;
    //   // assetTotal = assetList.cash +
    // },
  },
  methods: {
    addBtn() {
      this.$router.push('/daily');
    },
  },
};
</script>

<style></style>
