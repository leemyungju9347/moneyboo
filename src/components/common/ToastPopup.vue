<template>
  <div class="toast-popup" :class="showToastClass">
    <i v-if="isWarning" class="fas fa-exclamation-circle"></i>
    <i v-else class="far fa-check-circle"></i>
    {{ message }}
  </div>
</template>

<script>
import bus from '@/utils/bus';

let toastTimer;

export default {
  data() {
    return {
      message: '',
      isOpen: false,
      kinds: 'warning',
    };
  },
  computed: {
    showToastClass() {
      return this.isOpen ? 'show' : null;
    },
    isWarning() {
      return this.kinds === 'warning';
    },
  },
  created() {
    bus.$on('show:toast', this.showToast);
  },
  beforeDestroy() {
    bus.$off('show:toast', this.showToast);
  },
  methods: {
    showToast(message, option) {
      this.isOpen = true;
      this.kinds = option;
      this.message = message;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(this.hideToast, 3000);
    },
    hideToast() {
      this.isOpen = false;
    },
  },
};
</script>

<style></style>
