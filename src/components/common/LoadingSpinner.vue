<template>
  <div class="loader-cont" v-if="loading">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  props: ['loading'],
};
</script>

<style></style>
