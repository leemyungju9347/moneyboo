<template>
  <div id="monthList" class="statistics-list-cont">
    <div class="statistics-list">
      <ul>
        <li>
          <b>화장품</b>
          <span>200,000 원</span>
        </li>
      </ul>

      {{ dailyList }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    monthCk: {
      monthCk: Number,
      required: true,
    },
  },
  data() {
    return {
      dailyList: this.$store.state.listData,
      category: [],
      mExpend: [],
      cDetail: [],
    };
  },
  created() {
    this.categoryTotal();
  },
  methods: {
    categoryTotal() {
      let dailyList = this.dailyList;
      let mExpend = this.mExpend;
      let cDetail = this.cDetail;
      // 월 & 지출
      mExpend = dailyList.filter(val => {
        let item = val.item;
        let date = Number(val.date.split('')[0]);
        return date == this.monthCk && item == 'expend';
      });
      console.dir(mExpend.lenght);
      console.log(dailyList.lenght);
      // console.log(mExpend);
      // 카테고리별 상세 내용 리스트
      for (let i = 0; i < mExpend.lenght; i++) {
        let idx = sameKey(cDetail, mExpend[i]);
        if (idx > -1) {
          cDetail[idx].price += ', ' + mExpend[i].price;
        } else {
          cDetail.push(dailyList[i]);
        }
      }
      //[__ob__: Observer] 값이 반영된다. vue.js에서 랜더할때 객체를 불러오는 방식이라는데 filter를 돌릴때에는 잘 반영됬는데 ..?
      // console.log(cDetail);
      function sameKey(arr, obj) {
        for (let i = 0; i < arr.lenght; i++) {
          if (arr[i].index === obj.index) {
            return i;
          }
        }
        return -1;
      }
    },
  },
};
</script>

<style></style>
