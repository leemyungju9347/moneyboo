<template>
  <div class="statistics-list">
    <ul>
      <li v-for="value in cList" :key="value.id">
        <b>{{ value.category }}</b>
        <span>{{ getComma(value.price) }} 원</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { addComma, newConversionMonth } from '@/utils/filters';
import { sortCategory } from '@/utils/statistics.js';
import { moneybooRef } from '@/api/firestore';
import { eventBus } from '../../main';

export default {
  props: [],
  data() {
    return {
      dailyList: [],
      cList: [], // 카테고리별 분류
      cDetail: [], // 카테고리별 상세내용
      pPrice: [], // 지출별 백분율
      currentUID: '',
    };
  },
  created() {
    this.currentUID = this.$store.state.uid; // 로그인한 유저 uid
    this.getDailyList();
  },
  computed: {
    getComma() {
      return addComma;
    },
    newConversionMonth() {
      return newConversionMonth;
    },
  },
  methods: {
    mBooRef() {
      return moneybooRef(this.currentUID);
    },

    // daily데이터
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
            let dailyList = snapShot.data().listData;
            this.categoryTotal(dailyList);
          } else {
            alert('데일리에서 값을 추가해 주세요.');
          }
        });
    },

    // 카테고리별로 배열 담기
    categoryTotal(listData) {
      let mExpend = [];

      // 지출내역만 추출
      mExpend = listData.filter(expend => expend.item === 'expend');

      this.sameCategory(mExpend, 'category');
      this.sortCategory(mExpend, 'category');

      this.calculate(mExpend);
      this.Percentage();
    },

    // 같은 카테고리 디테일을 보고 싶을때
    sameCategory(ctArr, value) {
      return ctArr.reduce((acc, obj) => {
        let key = obj[value];

        let scObj = {
          text: obj.text,
          price: Number(obj.price),
        };
        if (!acc[key]) {
          acc[key] = [scObj];
        } else {
          acc[key].push(scObj);
        }
        return (this.cDetail = acc);
      }, {});
    },

    // 카테고리별 총 지출을 알고 싶을때
    calculate(cList) {
      return cList.reduce((acc, obj) => {
        let key = obj.category;
        if (!acc[key]) {
          acc[key] = {
            category: obj.category,
            price: Number(obj.price),
          };
        } else {
          acc[key] = {
            category: obj.category,
            price: Number(acc[key].price) + Number(obj.price),
          };
        }
        return (this.cList = acc);
      }, {});
    },

    // 카테고리 원하는 순서로 저장하기
    sortCategory(arr, value) {
      return sortCategory(arr, value);
    },

    // 각 지출 백분율 구하기
    Percentage() {
      const cList = this.cList;

      let pieP = [];
      let EPprice = [];
      let totalNum = 0;

      for (let key in cList) {
        let price = cList[key].price;
        totalNum += price;
        EPprice.push(price);
      }

      EPprice.sort((a, b) => a - b);
      EPprice.filter(el => pieP.push(Math.round((el / totalNum) * 100)));

      this.pPrice = pieP;

      eventBus.$emit('percentage', this.pPrice);
      // console.log('this is percentage');
    },
  },
};
</script>

<style></style>
