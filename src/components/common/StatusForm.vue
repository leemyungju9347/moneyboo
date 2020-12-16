<template>
  <div class="status-form">
    <!-- 상태 아이콘 -->
    <div class="status-icon-cont">
      <i v-bind:class="callCheckIconCondition()"></i>
    </div>
    <!-- 로딩 바 -->
    <div class="loading-bar-cont">
      <div class="loading-bar" v-bind:style="callPrintLoadingBar()">
        <b class="bar-number" v-bind:class="{ 'low-bar': totalPercent < 30 }"
          >{{ callTotalGoalPercent() }}%</b
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { newConversionMonth } from '@/utils/filters';
import { moneybooRef, settingColRef } from '@/api/firestore';
import {
  addExpend,
  totalGoalPercent,
  checkIconCondition,
  printLoadingBar,
} from '@/utils/statusHeader';

export default {
  created() {
    this.getListData();
    this.getTotalGoal();
  },
  computed: {
    ...mapState(['uid']), // 현재 로그인한 유저 uid
  },
  data() {
    return {
      totalGoal: 0,
      totalExpendPrice: 0,
      totalPercent: 0,
      getAllListData: [],
    };
  },
  methods: {
    // firstore에서 totalGoal DB 가져오기
    getTotalGoal() {
      this.settingListRef()
        .doc('assets')
        .onSnapshot(snapshot => {
          // document의 값이 있으면
          if (snapshot.exists) {
            const assets = snapshot.data().assets;

            //console.log(assets);

            if (assets) {
              this.totalGoal = assets.totalGoal;
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
            this.totalExpendPrice = addExpend(this.getAllListData);
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
    mbooRef() {
      return moneybooRef(this.uid);
    },
    settingListRef() {
      // settings document > settingList collection 참조값
      return settingColRef(this.uid);
    },
    // 총 목표금액과 현재금액 계산하는 함수를 불러오는 함수
    callTotalGoalPercent() {
      return (this.totalPercent = totalGoalPercent(
        this.totalExpendPrice,
        this.totalGoal,
      ));
    },
    //퍼센트에 따른 이모티콘 변화를 불러오는 함수
    callCheckIconCondition() {
      return checkIconCondition(this.totalPercent);
    },
    //퍼센트에 따른 로딩바의 변화를 불러오는 함수
    callPrintLoadingBar() {
      return printLoadingBar(
        this.totalPercent,
        this.totalExpendPrice,
        this.totalGoal,
      );
    },
  },
};
</script>

<style></style>
