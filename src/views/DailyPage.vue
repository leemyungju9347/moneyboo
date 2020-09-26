<template>
  <div class="daily-page-wrap">
    <DailyBalance></DailyBalance>
    <DailyListAdd></DailyListAdd>
    <DailyList></DailyList>
  </div>
</template>

<script>
import DailyBalance from '@/components/daily/DailyBalance';
import DailyList from '@/components/daily/DailyList';
import DailyListAdd from '@/components/daily/DailyListAdd';
import listMixins from '@/mixins/listMixins.js';

export default {
  components: {
    DailyBalance,
    DailyList,
    DailyListAdd,
  },
  mixins: [listMixins],
};
</script>
<style></style>
