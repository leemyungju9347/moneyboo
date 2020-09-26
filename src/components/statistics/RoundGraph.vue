<template>
  <div class="round-graph-cont" :class="{ on: selectedTab === 0 }">
    <!-- v-show="selectedTab === 1" -->
    <div class="round-graph">
      <h3>{{ whatMonth() }}월</h3>
      <div id="canvas-holder">
        <canvas ref="rGraph"></canvas>
      </div>
    </div>
    {{ percentage }}
    <ListOfMonth></ListOfMonth>
  </div>
  <!-- 내용 리스트 -->
</template>

<script>
import { todayCheck } from '@/utils/statistics.js';
import ListOfMonth from '@/components/statistics/ListOfMonth.vue';
import { eventBus } from '../../main';

export default {
  props: ['selectedTab', 'size'],
  components: {
    ListOfMonth,
  },
  data() {
    return {
      percentage: [],
    };
  },
  created() {
    eventBus.$on('percentage', value => {
      this.percentage = value;
    });
  },
  mounted() {
    // mounted 부분에서 this를 찍으면 data의 값이 잘 반영 되는데 this.pPrice를 찍으면 [__ob__: Observer] 이런 결과가 나온다.
    // JSON.parse(JSON.stringfy(this.pPrice)) 를 해보면 빈 배열이 나온다.
    // 순서는 created한후 mounted가 된다.
    // 문제가 뭔지를 모르겠다...........

    const ctx = this.$refs.rGraph;
    //chart default값 설정하기
    this.$_Chart.defaults.global.defaultFontColor = '#3b3b3b';
    this.$_Chart.defaults.global.defaultFontFamily = 'Jua';

    let myChart = new this.$_Chart(ctx, {
      type: 'pie',
      data: {
        labels: [], // 마우스가 근처에 오면 해당 카테고리 이름이 나온다.
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: [
              'rgb(224, 242, 241)',
              'rgb(178, 223, 219)',
              'rgb(128, 203, 196)',
              'rgb(77, 182, 172)',
              'rgb(38, 166, 154)',
            ],
            borderWidth: 0.5,
            borderAlign: 'innner',
          },
        ],
      },

      options: {
        // 추가하고 싶은 옵션이 있을경우 사용
        responsive: true,
        maintainAspectRatio: false,
        legend: false, // label의 색상을 알려주는 것.

        pieceLabel: {
          mode: 'label',
          position: 'border',
          fontSize: 11,
          fontStyle: 'bold',
        },
        animation: {
          animateScale: true,
        },

        scales: {},
      },
    });

    //data 값 setting하기
    // console.log(myChart.data.datasets[0].data);
    //myChart.data.datasets[0].data = this.percentage;
    // myChart.data.labels = Object.keys(this.cList);
    // console.log('graph mounted');
    myChart.update();
    return myChart;
  },
  computed: {
    whatMonth() {
      return todayCheck;
    },
  },
  methods: {
    function() {
      console.log('sdlkfjlsdjkf');
    },
  },
};
</script>

<style></style>
