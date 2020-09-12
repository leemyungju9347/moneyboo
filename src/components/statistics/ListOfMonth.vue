<template>
  <div id="monthList" class="statistics-list-cont">
    <div class="statistics-list">
      <ul>
        <li v-for="value in cList" :key="value.id">
          <b>{{ value.category }}</b>
          <span>{{ addComma(value.price) }} 원</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { addComma, newConversionMonth } from '@/utils/filters';
import { moneybooRef } from '@/api/firestore';
import { eventBus } from '../../main';

export default {
  props: {
    monthCk: {
      monthCk: Number,
      required: true,
    },
  },
  data() {
    return {
      dailyList: [],
      category: [], // 카테고리 리스트
      cList: [], // 카테고리별 분류
      cDetail: [], // 카테고리별 상세내용
      currentUID: '',
    };
  },
  created() {
    this.currentUID = this.$store.state.uid; // 로그인한 유저 uid
    this.getDailyList();
  },
  computed: {
    addComma() {
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
    getDailyDB() {
      return this.mBooRef()
        .doc('daily')
        .collection('listAdd');
    },
    // 초기값은 현재 달로 나오게 한후 년도에서 원하는 월별의 지출목록을 보기위해서는 해당 월을 클릭했을때 그 값을 변수로 넣어 실행 시켜 준다.
    getDailyList() {
      const today = newConversionMonth();
      this.getDailyDB()
        .doc(today)
        .onSnapshot(snapShot => {
          snapShot.exists
            ? (this.dailyList = snapShot.data().listData)
            : console.log('데일리에서 값을 추가해 주세요.');
          this.categoryTotal();
        });
    },

    // 카테고리별로 배열 담기
    categoryTotal() {
      const dailyList = this.dailyList;
      let mExpend = []; // 월별지출

      // 지출내역만 추출
      mExpend = dailyList.filter(expend => {
        const item = expend.item;
        return item === 'expend';
      });

      this.sortCategory(mExpend, 'category');
      this.cDetail = this.sameCategory(mExpend, 'category');
      this.calculate(mExpend);
      eventBus.$emit('sM-data', this.cList);
    },

    // 같은 카테고리 디테일을 보고 싶을때
    sameCategory(ctArr, value) {
      return ctArr.reduce((acc, obj) => {
        let key = obj[value];

        let scObj = {
          category: obj[value],
          price: Number(obj.price),
          text: obj.text,
        };
        if (!acc[key]) {
          acc[key] = [scObj];
        } else {
          acc[key].push(scObj);
        }
        return acc;
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
      arr.sort((a, b) => {
        // 한글 오름차순
        return a[value] < b[value] ? -1 : a[value] > b[value] ? 1 : 0;
      });
    },
  },
};
</script>

<style></style>
