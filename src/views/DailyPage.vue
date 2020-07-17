<template>
  <div class="daily-page-wrap">
    <DailyBalance></DailyBalance>
    <DailyList></DailyList>
    <DailyListAdd></DailyListAdd>
  </div>
</template>

<script>
import DailyBalance from '@/components/daily/DailyBalance';
import DailyList from '@/components/daily/DailyList';
import DailyListAdd from '@/components/daily/DailyListAdd';

export default {
  components: {
    DailyBalance,
    DailyList,
    DailyListAdd,
  },
};
</script>

<style></style>
