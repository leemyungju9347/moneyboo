<template>
  <div class="set-asset">
    <!-- 1.목표금액 설정 2.각 자산들 설정 -->
    <h3 class="font-jua">목표 금액 설정 - 개인작업용</h3>
    <b class="explanation">* 모든 금액은 숫자만 기입해 주세요</b>
    <form action="" class="clear">
      <div action="" class="total-goal-cont">
        <strong>총 목표 금액</strong>
        <input
          type="text"
          placeholder="총 목표 금액을 입력해 주세요"
          v-model="saveAsset.assets.totalGoal"
        />
      </div>

      <div action="" class="money-goal-cont">
        <strong>현금 목표 금액</strong>
        <input
          type="text"
          placeholder="현금 목표 금액을 입력해 주세요"
          v-model="saveAsset.assets.cashGoal"
        />
      </div>

      <div action="" class="money-asset-cont">
        <strong>현금 자산</strong>
        <input
          type="text"
          placeholder="현금 자산을 입력해 주세요"
          v-model="saveAsset.assets.cashAsset"
        />
      </div>

      <div action="" class="credit-goal-cont">
        <strong>은행 별 자산 입력</strong>
        <b class="explanation" v-if="bankLength !== 0">
          <!-- 저장되어 있는 은행 개수를 불러와야 하기 때문에 firebase에 저장되어있는 banks의 length를 이용. -->
          ( 현재 {{ bankLength }}개의 은행 자산이 저장되어 있습니다.)
        </b>
        <button @click.prevent="clickAddBank()">+</button>
        <ul>
          <li class="explanationLi" v-if="saveAsset.banks.length === 0">
            <!-- 입력창이 하나라도 생성되면 안내글을 사라지게 해야하므로, saveAsset의 banks 길이를 이용 -->
            <span class="explanation">
              우측 <span>+</span> 버튼을 눌러 은행 별 자산 입력창을 추가해
              주세요.
            </span>
          </li>
          <li v-for="bankList in saveAsset.banks" :key="bankList.id">
            <select name="bank" v-model="bankList.bank">
              <option value="">은행선택</option>
              <option value="경남은행">경남은행</option>
              <option value="광주은행">광주은행</option>
              <option value="국민은행">국민은행</option>
              <option value="기업은행">기업은행</option>
              <option value="농협">농협</option>
              <option value="대구은행">대구은행</option>
              <option value="부산은행">부산은행</option>
              <option value="산업은행">산업은행</option>
              <option value="저축은행">저축은행</option>
              <option value="새마을금고">새마을금고</option>
              <option value="수협중항회">수협중항회</option>
              <option value="신협">신협</option>
              <option value="신한은행">신한은행</option>
              <option value="우리은행">우리은행</option>
              <option value="우체국">우체국</option>
              <option value="전북은행">전북은행</option>
              <option value="제주은행">제주은행</option>
              <option value="카카오뱅크">카카오뱅크</option>
              <option value="케이뱅크">케이뱅크</option>
              <option value="하나은행">하나은행</option>
              <option value="한국씨티은행">한국씨티은행</option>
              <option value="SC제일은행">SC제일은행</option>
            </select>
            <input
              type="text"
              placeholder="해당 은행의 총 목표 금액을 입력해 주세요"
              v-model="bankList.asset"
            />
            <span class="realTimeAsset"
              >( 현재
              {{
                matchBankPrice(getAllListData, bankList.bank, bankList.asset)
              }}원 남음 )</span
            >
            <button
              class="btn small remove"
              @click.prevent="clickRemoveBank(bankList)"
            >
              ✕
            </button>
          </li>
        </ul>
      </div>
      <button
        class="btn small"
        v-if="
          this.$store.state.total === '' &&
            this.$store.state.cash === '' &&
            this.$store.state.bankAsset.bank === '' &&
            this.$store.state.bankAsset.asset === 0
        "
        @click.prevent="clickSaveAsset()"
      >
        설정
      </button>
      <button
        class="btn small"
        v-if="
          this.$store.state.total !== '' ||
            this.$store.state.cash !== '' ||
            this.$store.state.bankAsset.bank !== '' ||
            this.$store.state.bankAsset.asset !== 0
        "
        @click.prevent="clickSaveAsset()"
      >
        수정
      </button>
    </form>
  </div>
</template>

<script>
import { makeID, addComma, newConversionMonth } from '@/utils/filters.js';
import { moneybooRef, settingColRef } from '@/api/firestore';
import firebase from 'firebase';

export default {
  data() {
    return {
      // '입력한 값', 'firebase에서 불러온 저장된 값' 모두 saveAsset 이용.
      saveAsset: {
        assets: {
          totalGoal: '',
          cashGoal: '',
          cashAsset: '',
        },
        banks: [],
      },
      bankLength: 0, // 저장된 은행 개수 위해 필요.
      currentUid: this.$store.state.uid, // 현재 로그인한 유저의 uid
      // 은행 별 지출 금액 데이터 불러옴(from DailyList)
      getAllListData: [], // (현재 얼마남았는지 나타내는 tag에서 사용.)
    };
  },
  created() {
    // 페이지 로딩 시 기본적으로 은행 별 자산 입력 칸 하나 생성시켜줌.
    if (this.saveAsset.banks === []) {
      this.saveAsset.banks.push({ bank: '', asset: '', id: '' });
    }

    // 저장된 은행 수 data에 넣어줌.
    this.bankNum = this.$store.state.bankAsset.bank.length;

    // firstore에서 asset DB 가져오기
    this.getFirebase();

    // 은행 별 남은 자산 구하는 함수 실행시켜 줌
    this.getBankBalance();
  },
  computed: {},
  methods: {
    mbooRef() {
      return moneybooRef(this.currentUid);
    },
    settingListRef() {
      // settings document > settingList collection 참조값
      return settingColRef(this.currentUid);
    },
    // listAdd collection 참조 값
    dailyListAddRef() {
      return this.mbooRef()
        .doc('daily')
        .collection('listAdd');
    },
    // 숫자만 입력되었는지 확인.
    checkNum(inputData) {
      // 콤마 있으면 지워줌.
      inputData = this.removeComma(inputData);

      let title = '';
      if (inputData === this.saveAsset.assets.totalGoal) {
        title = '총 목표 금액';
      } else if (inputData === this.saveAsset.assets.cashAsset) {
        title = '현금 자산';
      } else if (inputData === this.saveAsset.assets.cashAsset) {
        title = '현금 자산';
      } else if (inputData === this.saveAsset.assets.cashGoal) {
        title = '현금 목표 금액';
      }
      for (let i = 0; i < this.saveAsset.banks.length; i++) {
        if (inputData === this.saveAsset.banks[i].asset) {
          title = '은행 별 자산';
        }
      }

      console.log('아래 내용은 title');
      console.log(title);
      if (isNaN(inputData)) {
        alert(`'${title}'에 숫자만 입력해주세요.`);
        return 'notNum';
      }
    },
    clickAddBank() {
      this.saveAsset.banks.push({ bank: '', asset: '', id: makeID('bank') });
    },
    clickRemoveBank(bankList) {
      console.log(bankList);
      this.settingListRef()
        .doc('banks')
        .update({ banks: firebase.firestore.FieldValue.arrayRemove(bankList) });
    },
    clickSaveAsset() {
      // 에셋리스트 저장
      this.saveAssetListForm();
      // bank 저장
      this.setBankListForm();

      // 저장되었다는 안내창 뜨게 한 후 새로고침.
      alert('목표 금액이 수정되었습니다.');
      // location.reload();
    },
    // created()에서 사용할 함수(추가, 수정, 삭제 된 데이터 화면에 바로 반영되도록.)
    getFirebase() {
      // assets
      this.settingListRef()
        .doc('assets')
        .onSnapshot(snapshot => {
          // console.log(snapshot.data().setAsset);
          // document의 값이 있으면
          if (snapshot.exists) {
            const assets = snapshot.data().assets;
            console.log(assets);
            if (assets) {
              this.saveAsset.assets.totalGoal = this.assetAddComma(
                // 저장 후 화면에 금액 나타날 때 1000단위 콤마 적용.
                assets.totalGoal,
              );
              this.saveAsset.assets.cashAsset = this.assetAddComma(
                // 저장 후 화면에 금액 나타날 때 1000단위 콤마 적용.
                assets.cashAsset,
              );
              this.saveAsset.assets.cashGoal = this.assetAddComma(
                // 저장 후 화면에 금액 나타날 때 1000단위 콤마 적용.
                assets.cashGoal,
              );
            }
          }
        });

      // banks
      this.settingListRef()
        .doc('banks')
        .onSnapshot(snapshot => {
          // console.log(snapshot.data().setAsset);
          // document의 값이 있으면
          if (snapshot.exists) {
            const banks = snapshot.data().banks;
            console.log(banks);
            if (banks) {
              this.saveAsset.banks = banks;
              this.bankLength = banks.length;

              // 저장 후 화면에 금액 나타날 때 1000단위 콤마 적용.
              for (let i = 0; i < banks.length; i++) {
                this.saveAsset.banks[i].asset = this.assetAddComma(
                  banks[i].asset,
                );
              }
            }
          }
        });
    },
    // asset 저장
    saveAssetListForm() {
      // 저장하려는 값에 적힌 콤마 제거.
      this.saveAsset.assets.totalGoal = this.removeComma(
        this.saveAsset.assets.totalGoal,
      );
      this.saveAsset.assets.cashAsset = this.removeComma(
        this.saveAsset.assets.cashAsset,
      );
      this.saveAsset.assets.cashGoal = this.removeComma(
        this.saveAsset.assets.cashGoal,
      );

      // 숫자만 입력했는지 확인.
      if (this.checkNum(this.saveAsset.assets.totalGoal) === 'notNum') return;
      if (this.checkNum(this.saveAsset.assets.cashAsset) === 'notNum') return;
      if (this.checkNum(this.saveAsset.assets.cashGoal) === 'notNum') return;

      // 총 목표금액이 공백일 경우 알림창 뜨게 함.
      if (this.saveAsset.assets.totalGoal === '') {
        alert("'총 목표 금액'을 입력해 주세요.");
        return;
      }

      // '현금 목표금액', '현금 자산'을 입력하지 않았을 경우 '0'원으로 저장 함.
      if (this.saveAsset.assets.cashAsset === '') {
        this.saveAsset.assets.cashAsset = 0;
      }
      if (this.saveAsset.assets.cashGoal === '') {
        this.saveAsset.assets.cashGoal = 0;
      }

      console.log(this.saveAsset.assets);
      // 숫자만 입력되었으면 입력값 저장.
      this.settingListRef()
        .doc('assets')
        .get()
        .then(doc => {
          console.log(doc);
          // asset doc이 있다면?
          if (doc.exists) {
            this.settingListRef()
              .doc('assets')
              .update({ assets: this.saveAsset.assets });

            // asset doc이 없다면?
          } else {
            this.settingListRef()
              .doc('assets')
              .set({
                assets: this.saveAsset.assets,
              });
          }
        })
        .catch(err => {
          console.log('여기는 setAsset.vue에서 saveAssetListForm', err);
        });
    },
    // bank 저장
    setBankListForm() {
      for (let i = 0; i < this.saveAsset.banks.length; i++) {
        // 저장하려는 값에 적힌 콤마 제거.
        this.saveAsset.banks[i].asset = this.removeComma(
          this.saveAsset.banks[i].asset,
        );

        // 은행이 선택되었는지 확인.
        if (this.saveAsset.banks[i].bank === '') {
          alert("'은행'을 선택해 주세요.");
          return;
        }
        // 은행 별 자산에 숫자만 입력되었는지 확인.
        if (this.checkNum(this.saveAsset.banks[i].asset) === 'notNum') return;
        // 각 은행별 자산이 공백일 경우 알림창 뜨게 함.
        if (this.saveAsset.banks[i].asset === '') {
          alert("'은행 별 자산 금액'을 입력해 주세요.");
          return;
        }
      }

      this.settingListRef()
        .doc('banks')
        .get()
        .then(doc => {
          // banks doc이 있다면
          if (doc.exists) {
            this.settingListRef()
              .doc('banks')
              .update({
                banks: this.saveAsset.banks,
              });

            // banks doc이 없다면
          } else {
            this.settingListRef()
              .doc('banks')
              .set({
                banks: this.saveAsset.banks,
              });
          }
        })
        .catch(err => {
          console.log('SetAsset.vue 에 있는 setBankListForm', err);
        });
    },

    // DailyList.vue의 지출 내역 불러옴.
    getBankBalance() {
      const yearsMonth = newConversionMonth();

      // listAdd collection 하위에 있는 document 전체를 불러옴
      this.dailyListAddRef()
        .doc(yearsMonth)
        .onSnapshot(snapshot => {
          console.log(snapshot);
          snapshot.exists
            ? (this.getAllListData = snapshot.data().listData)
            : console.log('값이 없습니다!');
        });
    },
    // 각 은행 별 자산 사용 후 남은 금액.
    matchBankPrice(allListdata, bankAssetName, bankAssetNum) {
      // '각 은행 별 사용금액의 총 합' 변수 선언.
      let priceSum = 0;
      console.log(bankAssetName);
      // 'dailyList'에서 불러온 지출/수입 내역 foreEach로 확인.
      allListdata.forEach(listdata => {
        // bankAsset과 같은 은행의 지출 내역 구함.
        if (listdata.bank === bankAssetName && listdata.item === 'expend') {
          priceSum += listdata.price * 1;
        } else if (
          // bankAsset과 같은 은행의 수입 내역 구함.
          listdata.bank === bankAssetName &&
          listdata.item === 'income'
        ) {
          priceSum += -listdata.price * 1;
        }
      });

      // bankAsset에서 해당은행사 지출내역 뺴줌.(1000단위로 콤마 찍어줌)
      return this.assetAddComma(this.removeComma(bankAssetNum) * 1 - priceSum);
    },

    assetAddComma(asset) {
      return addComma(asset);
    },
    removeComma(asset) {
      return asset.replace(/,/g, '');
    },
  },
};
</script>

<style></style>
