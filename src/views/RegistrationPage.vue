<template>
  <div class="registration-page-wrap no-header" v-bind="resizeCheckEvent()">
    <LoginForm></LoginForm>
    <SignupForm></SignupForm>
  </div>
</template>

<script>
import LoginForm from '@/components/registration/LoginForm';
import SignupForm from '@/components/registration/SignupForm';
import { deleteCookie } from '@/utils/cookies';
import listMixins from '@/mixins/listMixins.js';
import { resizeEvent, sizeInit } from '@/js/registration';
export default {
  components: {
    LoginForm,
    SignupForm,
  },
  mixins: [listMixins],
  created() {
    deleteCookie('cur_path');
  },
  mounted() {
    sizeInit();
  },
  methods: {
    resizeCheckEvent() {
      window.onload = resizeEvent();
    },
  },
};
</script>

<style></style>
