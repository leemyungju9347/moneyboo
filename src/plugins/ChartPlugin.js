// 컴포넌트 마다 불러온 chart를 plugin에서 한번 불러온후 로딩 해온다.
import Chart from 'chart.js';

export default {
  install(Vue) {
    Vue.prototype.$_Chart = Chart;
  },
};
