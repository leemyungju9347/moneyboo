<template>
  <div id="yearList" class="statistics-list">
    <ul>
      <li v-for="(mon, idx) in yearsExpend" :key="idx">
        <b>{{ mon.month }}월</b>
        <span>{{ mon.expend }} 원</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { addComma } from '@/utils/filters';
import { moneybooRef } from '@/api/firestore';
import { eventBus } from '../../main';

export default {
  data() {
    return {
      currentUID: '',
      yearsList: [], // dailyList데이터
      yearsExpend: {},
    };
  },
  created() {
    this.currentUID = this.$store.state.uid;
    this.getDailyDB();
    addComma();
  },
  methods: {
    mBooRef() {
      return moneybooRef(this.currentUID);
    },
    getDailyDB() {
      this.mBooRef()
        .doc('daily')
        .collection('listAdd')
        .onSnapshot(snapShot => {
          snapShot.forEach(doc => {
            this.yearsList.push(doc.data().listData);
          });
          this.calculateEP();
        });
    },

    // 1년 중 월별 총 지출
    calculateEP() {
      const yearsDB = this.yearsList;

      let flattened = yearsDB.reduce((acc, curr) => acc.concat(curr), []);

      let exArr = flattened.filter(exp => exp.item === 'expend');

      exArr.map(el => (el.date = el.date.substr(0, 1)));

      let monthTotal = exArr.reduce((acc, crr) => {
        const key = crr.date;

        if (!acc[key]) {
          acc[key] = {
            month: crr.date,
            expend: Number(crr.price),
          };
        } else {
          acc[key] = {
            month: crr.date,
            expend: Number(crr.price) + Number(acc[key].expend),
          };
        }
        return acc;
      }, {});

      this.yearsExpend = monthTotal;
      eventBus.$emit('monthExpend', this.yearsExpend);
    },
  },
};
</script>

<style></style>
