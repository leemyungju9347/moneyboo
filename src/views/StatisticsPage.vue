<template>
  <div class="statistics-page-wrap">
    <div class="statistics-cont">
      <BarGraph></BarGraph>
      <RoundGraph></RoundGraph>
      <StatisticsList></StatisticsList>
    </div>
  </div>
</template>

<script>
import BarGraph from '@/components/statistics/BarGraph.vue';
import RoundGraph from '@/components/statistics/RoundGraph.vue';
import StatisticsList from '@/components/statistics/StatisticsList.vue';

export default {
  components: {
    BarGraph,
    RoundGraph,
    StatisticsList,
  },
};
</script>

<style></style>
