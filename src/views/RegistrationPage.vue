<template>
  <div class="registration-page-wrap">
    <LoginForm></LoginForm>
    <SignupForm></SignupForm>
  </div>
</template>

<script>
import LoginForm from '@/components/registration/LoginForm';
import SignupForm from '@/components/registration/SignupForm';

export default {
  components: {
    LoginForm,
    SignupForm,
  },
};
</script>

<style></style>
