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
import listMixins from '@/mixins/listMixins.js';

export default {
  components: {
    BarGraph,
    RoundGraph,
  },
  mixins: [listMixins],
};
</script>

<style></style>
