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
            <b id="ani-money"
              >{{ totalBankAssets(dailyList, nInfo.bank, nInfo.asset) }}원</b
            >
          </li>
        </ul>
      </div>
      <!-- 현금 -->
      <div class="cash-asset-cont">
        <em>현금</em>
        <b id="ani-money">{{ makeComma(cash) }} 원</b>
      </div>

      <button @click.prevent="addBtn" class="btn big main">추가</button>
    </form>
  </div>
</template>

<script>
import { addComma, newConversionMonth } from '@/utils/filters.js';
import { moneybooRef, settingColRef } from '@/api/firestore';
// firebase를 사용하기 위해서 불러와야 한다.

export default {
  data() {
    return {
      currentUID: '',
      dailyList: [], // 수입/지출
      assetTotal: '', // 계산된 총 자산
      bankArr: [],
      cash: 0, // 현금자산
    };
  },
  created() {
    this.currentUID = this.$store.state.uid; // 로그인한 유저 uid

    this.getDailyList(); // 수입/지출 목록
    this.getAssetsDB(); // 목표 금액
    this.getBanksDB(); // 은행별 자산
  },
  methods: {
    addBtn() {
      this.$router.push('/daily');
    },

    makeComma(val) {
      return addComma(val);
    },

    // 현금 자산 불러오기
    getAssetsDB() {
      this.settingListRef()
        .doc('assets')
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            const assets = snapshot.data().assets;
            this.cash = assets.cashAsset;
          } else if (this.$router.currentRoute.path !== '/main') {
            // 값이 없을 경우
            alert(
              '관리 페이지에서 초기값을 입력해 주세요. 확인을 누르면 해당 페이지로 이동합니다.',
            );
            this.$router.push('/setting');
          } else return;
        });
    },

    // 은행 자산 불러오기
    getBanksDB() {
      this.settingListRef()
        .doc('banks')
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            this.bankArr = snapshot.data().banks;
            this.totalCalculate();
          } else {
            // 값이 없을 경우
            alert(
              '관리 페이지에서 은행별 자산 초기값을 입력해 주세요. 확인을 누르면 해당 페이지로 이동합니다.',
            );
            this.$router.push('/setting');
          }
        });
    },

    // dailyList
    getDailyDB() {
      return this.mBooRef()
        .doc('daily')
        .collection('listAdd');
    },

    // daily > dailList
    getDailyList() {
      const today = newConversionMonth();
      this.getDailyDB()
        .doc(today)
        .onSnapshot(snapShot => {
          if (snapShot.exists) {
            this.dailyList = snapShot.data().listData;
          } else {
            alert('데일리에서 값을 추가해 주세요.');
          }
        });
    },

    // settingList
    settingListRef() {
      return settingColRef(this.currentUID);
    },
    // dailyList
    mBooRef() {
      return moneybooRef(this.currentUID);
    },

    // 은행별 수입 지출 현황
    totalBankAssets(dailyList, bankName, bankAsset) {
      let price = 0;

      dailyList.forEach(listDB => {
        let listBank = listDB.bank;
        let listItem = listDB.item;

        if (listBank === bankName && listItem === 'expend') {
          price += Number(listDB.price);
        } else if (listBank === bankName && listItem === 'income') {
          price += -Number(listDB.price);
        }
      });

      return this.makeComma(Number(bankAsset) - price);
    },

    // 총 자산 계산
    totalCalculate() {
      let bankTotal = 0;
      let dailyTotal = 0;
      let cashTotal = 0;

      console.log(this.dailyList); // 처음 호명 했을때 dailyList를 불러오지 못한다.

      this.dailyList.map(daily => {
        let dailyItem = daily.item;
        let dailyPrice = Number(daily.price);
        let dailyBank = daily.bank;

        // 은행 수입/지출 계산
        if (dailyBank !== '현금' && dailyItem === 'expend') {
          dailyTotal += -dailyPrice;
        } else if (dailyBank !== '현금' && dailyItem === 'income') {
          dailyTotal += dailyPrice;
        }

        // 현금 수입/지출 계산
        if (dailyBank === '현금' && dailyItem === 'expend') {
          cashTotal += -dailyPrice;
        } else if (dailyBank === '현금' && dailyItem === 'income') {
          cashTotal += dailyPrice;
        }
      });

      this.cash = Number(this.cash) + cashTotal;

      this.bankArr.filter(banks => {
        const bankAsset = Number(banks.asset);
        bankTotal += bankAsset;
      });

      this.assetTotal = bankTotal + this.cash + dailyTotal;
      // 해당 페이지에서 새로고침을 하면 값이 나온다. 다른페이지를 갔다가 해당 페이지에 들어오면 계산된 값이 아닌 초기전재산값이 나온다.
    },
  },
};
</script>

<style></style>
