<template>
  <div class="statistics-page-wrap">
    <div class="statistics-cont">
      <RoundGraph></RoundGraph>
      <BarGraph></BarGraph>
    </div>
  </div>
</template>

<script>
import BarGraph from '@/components/statistics/BarGraph.vue';
import RoundGraph from '@/components/statistics/RoundGraph.vue';

export default {
  components: {
    BarGraph,
    RoundGraph,
  },
};
</script>

<style></style>
