<template>
  <!-- 가영 -->
  <!-- /statistics  -->
  <div class="round-graph-cont">
    <div class="round-graph">
      <h3><span>1월</span></h3>
      <div id="canvas-holder">
        <canvas id="r-graph"></canvas>
      </div>

      <!-- <ul>
        <li>
          <span>화장품</span>
          <b>30%</b>
        </li>
        <li>
          <span>식비</span>
          <b>30%</b>
        </li>
        <li>
          <span>공과금</span>
          <b>30%</b>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  data() {
    return {
      dailyList: this.$store.state.listData,
    };
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
              //
              // 'rgb(31, 97, 141)',
              // 'rgb(40, 116, 166)',
              // 'rgb(20, 143, 119)',
              // 'rgb(18, 122, 101)',
              // 'rgb(29, 132, 73)',
              //
              // rgb(52,143,108)
              // 'rgb(101, 198, 187)',
              // 'rgb(134, 226, 213)',
              // 'rgb(200, 247, 197)',
              // 'rgb(104, 195, 163)',
              // 'rgb(102, 204, 153)',
              // 'rgb(135, 211, 124)',
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
