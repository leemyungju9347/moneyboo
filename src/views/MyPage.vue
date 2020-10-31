<template>
  <div class="mypage-wrap no-header">
    <MyInfoForm></MyInfoForm>
  </div>
</template>

<script>
import MyInfoForm from '@/components/MyInfoForm.vue';
import listMixins from '@/mixins/listMixins.js';

export default {
  components: {
    MyInfoForm,
  },
  mixins: [listMixins],
};
</script>

<style></style>
