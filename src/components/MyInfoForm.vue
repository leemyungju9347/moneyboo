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
        </li>
        <li>
          Nickname
          <span>{{ nickname }}</span>
        </li>
      </ul>
    </div>

    <!-- setting페이지로 연결버튼 -->
    <button @click="clickMove()">Setting</button>
  </div>
</template>

<script>
import { newConversionMonth } from '@/utils/filters';
import { moneybooRef, settingColRef } from '@/api/firestore';

export default {
  data() {
    return {
      id: this.$store.state.email,
      nickname: this.$store.state.nickname,
      totalGoal: 0,
      totalExpendPrice: 0,
      totalPercent: 0,
      currentUid: this.$store.state.uid, // 현재 로그인한 유저 uid
    };
  },
  created() {
    this.getListData();
    this.getTotalGoal();
  },
  methods: {
    mbooRef() {
      return moneybooRef(this.currentUid);
    },
    settingListRef() {
      // settings document > settingList collection 참조값
      return settingColRef(this.currentUid);
    },
    clickMove() {
      this.$router.push('/setting');
    },
    // firstore에서 totalGoal DB 가져오기
    getTotalGoal() {
      this.settingListRef()
        .doc('assets')
        .get()
        .then(docSnapshot => {
          // document의 값이 있으면
          if (docSnapshot.exists) {
            const assets = docSnapshot.data().assets;
            // assets 데이터가 있으면
            if (assets) {
              this.totalGoal = assets.totalGoal;
              this.totalGoalPercent();
            }
          }
        });
    },
    // firestore에 있는 저장된 ListData DB를 가져오는 함수
    getListData() {
      const yearsMonth = newConversionMonth();
      // listAdd collection 하위에 있는 document 전체를 불러옴
      this.dailyListAddRef()
        .doc(yearsMonth)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            this.getAllListData = snapshot.data().listData;
            this.addExpend();
          } else {
            return console.log('값이 없습니다!');
          }
        });
    },
    // listAdd collection 참조 값
    dailyListAddRef() {
      return this.mbooRef()
        .doc('daily')
        .collection('listAdd');
    },
    // 지출값 더하는 함수
    addExpend() {
      console.log('addexpend 실행!');

      const copyList = this.getAllListData;
      let totalPrice = 0;

      for (let i = 0; i < copyList.length; i++) {
        if (copyList[i].item == 'expend') {
          let stringToNumber = Number(copyList[i].price);
          totalPrice += stringToNumber;
        }
      }
      return (this.totalExpendPrice = totalPrice);
    },
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
  },
};
</script>

<style></style>
