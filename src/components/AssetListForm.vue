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
import { moneybooRef, settingColRef } from '@/api/firestore';
// firebase를 사용하기 위해서 불러와야 한다.

export default {
  data() {
    return {
      assetTotal: '',
      bankArr: [],
      cash: '',
      currentUID: '',
    };
  },
  created() {
    this.currentUID = this.$store.state.uid; // 로그인한 유저 uid

    this.getAssetsDB();
    this.getBanksDB();
  },
  methods: {
    addBtn() {
      this.$router.push('/daily');
    },
    makeComma(val) {
      return addComma(val);
    },

    // assets
    getAssetsDB() {
      this.settingListRef()
        .doc('assets')
        .get()
        .then(doc => {
          // console.log(doc);
          if (doc.exists) {
            this.getFirebase();
          } else {
            // 값이 없을 경우
            alert(
              '관리 페이지에서 초기값을 입력해 주세요. 확인을 누르면 해당 페이지로 이동합니다.',
            );
            this.$router.push('/setting');
          }
        })
        .catch(err => {
          console.log('메인페이지 에러:', err);
        });
    },

    // banks
    getBanksDB() {
      this.settingListRef()
        .doc('banks')
        .get()
        .then(doc => {
          //console.log(doc);
          if (doc.exists) {
            this.getFirebase();
          } else {
            // 값이 없을 경우
            alert(
              '관리 페이지에서 은행별 자산 초기값을 입력해 주세요. 확인을 누르면 해당 페이지로 이동합니다.',
            );
            this.$router.push('/setting');
          }
        })
        .catch(err => {
          console.log('메인페이지 에러:', err);
        });
    },

    //firebase에서 db를 가져온다.
    getFirebase() {
      this.settingListRef()
        .doc('assets')
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            const assets = snapshot.data().assets;
            this.cash = assets.cashAsset;
          }
        });

      this.settingListRef()
        .doc('banks')
        .onSnapshot(snapshot => {
          // document의 값이 있으면
          if (snapshot.exists) {
            const banks = snapshot.data().banks;
            if (banks) {
              this.bankArr = banks;
            }
            this.totalCalculate();
          }
        });
    },

    mBooRef() {
      return moneybooRef(this.currentUID);
    },
    // settings> settingList
    settingListRef() {
      return settingColRef(this.currentUID);
    },
    // 총 자산 계산
    totalCalculate() {
      let bankArr = this.bankArr;
      let assets = 0;

      for (let i = 0; i < bankArr.length; i++) {
        let asset = Number(bankArr[i].asset);
        assets += asset;
      }

      this.assetTotal = Number(this.cash) + assets;
    },
  },
};
</script>

<style></style>
