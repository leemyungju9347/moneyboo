<template>
  <div class="round-graph-cont">
    <div class="round-graph">
      <h3>{{ whatMonth() }}월</h3>
      <div id="canvas-holder">
        <canvas id="r-graph"></canvas>
      </div>
    </div>
    <ListOfmonth :monthCk="whatMonth()"></ListOfmonth>
  </div>
</template>

<script>
import Chart from 'chart.js';
import ListOfmonth from './ListOfMonth';
import { todayCheck } from '@/utils/statistics.js';

export default {
  components: {
    ListOfmonth,
  },
  data() {
    return {
      dailyList: this.$store.state.listData,
    };
  },
  methods: {
    whatMonth() {
      return todayCheck();
    },
  },
  mounted() {
    const ctx = document.getElementById('r-graph');

    // chart default값 설정하기
    Chart.defaults.global.defaultFontColor = '#3b3b3b';
    Chart.defaults.global.defaultFontFamily = 'Jua';

    let myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        // 이름.
        labels: ['화장품', '식비', '공과금', '교통비', '식비'],
        datasets: [
          {
            backgroundColor: [
              'rgb(224, 242, 241)',
              'rgb(178, 223, 219)',
              'rgb(128, 203, 196)',
              'rgb(77, 182, 172)',
              'rgb(38, 166, 154)',
            ],
            data: [10, 20, 40, 10, 20],
            borderWidth: 0.5,
            borderAlign: 'innner',
          },
        ],
      },

      options: {
        layout: {},
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            //   fontColor: '#3b3b3b',
            //   fontFamily: 'BBTreeGR',
            // boxWidth: 14,
            // fontSize: 12,
            // padding: 8,
            //   fontStyle: 'bold',
          },
        },
      },
    });

    return myChart;
  },
};
</script>

<style></style>
