<template>
  <div class="bar-graph-cont" :class="{ on: selectedTab === 1 }">
    <!-- v-show="selectedTab === 0" -->
    <div class="bar-graph">
      <h3>{{ whatYear() }}</h3>
      <div id="canvas-holder">
        <canvas ref="bGraph"></canvas>
      </div>
    </div>

    <!-- 년도 리스트 -->
    <ListOfyears></ListOfyears>
    {{ yearsExpend }}
  </div>
</template>

<script>
import { yearCheck } from '@/utils/statistics.js';
import ListOfyears from '@/components/statistics/ListOfyears.vue';
import { eventBus } from '../../main';

export default {
  props: ['selectedTab', 'size'],
  components: {
    ListOfyears,
  },
  data() {
    return {
      yearsExpend: {},
    };
  },
  created() {
    eventBus.$on('monthExpend', value => {
      return (this.yearsExpend = value);
    });
  },
  mounted() {
    var ctx = this.$refs.bGraph;

    this.$_Chart.defaults.global.defaultFontColor = '#3b3b3b';
    this.$_Chart.defaults.global.defaultFontFamily = 'Jua';

    let myChart = new this.$_Chart(ctx, {
      // The type of chart we want to create
      type: 'horizontalBar',

      // The data for our dataset
      data: {
        // 이름.
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'],
        datasets: [
          {
            label: '2020년 지출내역',
            backgroundColor: [
              'rgb(178,223,219,0.3)',
              'rgb(178,223,219,0.3)',
              'rgb(178,223,219,0.3)',
              'rgb(178,223,219,0.3)',
              'rgb(178,223,219,0.3)',
              'rgb(178,223,219,0.3)',
              'rgb(178,223,219,0.3)',
              'rgb(178,223,219,0.3)',
            ],
            borderColor: 'rgb(178,223,219)',
            maxBarThickness: 40,
            borderWidth: 1.2,
            minBarThickness: 17,
            data: [15, 20, 30, 40, 50, 60, 70],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      },
    });
    //data 값 setting하기
    // console.log(this.yearsExpend);
    // myChart.data.datasets[0].data = this.yearsExpend
    // console.log(myChart.data.datasets[0].data);
    // myChart.data.labels = Object.keys(this.yearsExpend);
    // console.log('graph mounted');
    myChart.update();
    return myChart;
  },
  methods: {
    whatYear() {
      return yearCheck();
    },
  },
};
</script>

<style></style>
