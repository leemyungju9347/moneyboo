<template>
  <!-- 가영 -->
  <!-- /statistics -->
  <div class="statistics-list-cont">
    <div class="statistics-list">
      <ul>
        <li>
          <b>화장품</b>
          <span>200,000 원</span>
        </li>
      </ul>
      {{ dailyList }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dailyList: this.$store.state.listData,
    };
  },
};
</script>

<style></style>
