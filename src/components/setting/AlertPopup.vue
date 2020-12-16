<template>
  <div class="alert-popup" :class="{ popupShow: show === true }">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import bus from '@/utils/bus';
export default {
  data() {
    return {
      message: '',
      show: false,
    };
  },
  created() {
    bus.$on('sendAlertMessage', data => {
      console.log(data);
      this.show = data.show;
      if (this.show === true) {
        this.message = data.message;
        setTimeout(() => {
          this.show = false;
        }, 1500);
      }
    });
  },
  methods: {},
};
</script>

<style></style>
