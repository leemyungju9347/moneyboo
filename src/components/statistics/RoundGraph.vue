<template>
  <div class="round-graph-cont">
    <div class="round-graph">
      <h3>{{ whatMonth() }}월</h3>
      <div id="canvas-holder">
        <canvas ref="rGraph"></canvas>
      </div>
    </div>

    <ListOfMonth :monthCk="whatMonth" @listM-data="cList"></ListOfMonth>
    {{ pPrice }}
  </div>
</template>

<script>
import { todayCheck } from '@/utils/statistics.js';
import { addComma } from '@/utils/filters';
import ListOfMonth from '@/components/statistics/ListOfMonth.vue';
import { eventBus } from '../../main';

export default {
  components: {
    ListOfMonth,
  },
  data() {
    return {
      cList: [],
      pPrice: [],
    };
  },
  created() {
    eventBus.$once('sM-data', cList => {
      this.cList = cList;
      this.Percentage();
    });
  },
  mounted() {
    console.log('this is mounted');
    const ctx = this.$refs.rGraph;

    //chart default값 설정하기
    this.$_Chart.defaults.global.defaultFontColor = '#3b3b3b';
    this.$_Chart.defaults.global.defaultFontFamily = 'Jua';

    let myChart = new this.$_Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['sdf', 'zc', 'iwuqe'], // 마우스가 근처에 오면 해당 카테고리 이름이 나온다.
        datasets: [
          {
            data: [],
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
    /*** 해결이 필요한 부분 , 생성주기의 문제 같은데 아직 찾지를 못하겠다. ***/
    //data 값 setting하기
    //console.log(this.pPrice); //[__ob__: Observer]
    //console.log(this.cList); //[__ob__: Observer]
    console.log(this.pPrice);
    myChart.data.datasets[0].data = this.pPrice;
    myChart.data.labels = Object.keys(this.cList);

    myChart.update();
    return myChart;
  },

  methods: {
    whatMonth() {
      return todayCheck();
    },
    addComma() {
      return addComma;
    },
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

      pieP = this.pPrice;
    },
  },
};
</script>

<style></style>
