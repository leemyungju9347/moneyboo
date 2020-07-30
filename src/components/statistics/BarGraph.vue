<template>
  <div class="bar-graph-cont">
    <div class="bar-graph">
      <h3>{{ whatYear() }}</h3>
      <div id="canvas-holder">
        <canvas id="b-graph"></canvas>
      </div>
    </div>
    <ListOfyears></ListOfyears>
  </div>
</template>

<script>
import Chart from 'chart.js';
import ListOfyears from './ListOfyears';
import { yearCheck } from '@/utils/statistics.js';

export default {
  components: {
    ListOfyears,
  },
  methods: {
    whatYear() {
      return yearCheck();
    },
  },
  mounted() {
    var ctx = document.getElementById('b-graph').getContext('2d');

    Chart.defaults.global.defaultFontColor = '#3b3b3b';
    Chart.defaults.global.defaultFontFamily = 'Jua';

    new Chart(ctx, {
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
        // scales: {
        //   xAxes: [
        //     {
        //       stacked: true,
        //     },
        //   ],
        //   yAxes: [
        //     {
        //       stacked: true,
        //     },
        //   ],
        // },
      },
    });
  },
};
</script>

<style></style>
