<template>
  <!--회원가입 페이지  -->
  <div class="regist-form signup-form">
    <div class="regist-form-cont fade">
      <h3>회원가입</h3>
      <form class="form" action="" @submit.prevent="submitForm">
        <!-- 아이디 -->
        <div>
          <label for="username" v-if="!username">이메일</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <!-- 닉네임 -->
        <div>
          <label for="nickname" v-if="!nickname">닉네임</label>
          <input id="nickname" type="text" v-model="nickname" />
        </div>
        <!-- 비밀번호 -->
        <div>
          <label for="password" v-if="!password">비밀번호</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button class="btn big signup add-btn font-jua">가입</button>
      </form>
      <button class="reset-btn" @click.prevent="resetBtnForm()">
        되돌아가기
      </button>
    </div>
    <a
      href=""
      class="mask mask-signup fade"
      @click.prevent="clickSignupForm($event)"
      @mouseover="overSignupForm($event)"
      @mouseout="outSignupForm($event)"
    >
      <i class="mask-icon mask-signup"></i>
      <strong class="font-jua mask-signup">회원가입</strong>
    </a>
  </div>
</template>
<script>
import firebase from 'firebase';
import {
  clickFormEvent,
  globalMountedInSingup,
  overFormEvent,
  resetFormEvent,
  outFormEvent,
} from '@/js/register-event.js';

export default {
  data() {
    return {
      // register
      username: '',
      nickname: '',
      password: '',
      // event
    };
  },
  mounted() {
    // 이벤트 함수를 담당하는 js 함수에 element를 넘겨줘서 쉽게 dom을 제어할 수 있도록 함.
    globalMountedInSingup(this.$el);
  },
  methods: {
    // 회원가입 양식 제출
    submitForm() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(
          function(user) {
            console.log(user);
            alert('계정이 생성되었습니다!🎉');
          },
          function(err) {
            console.log(err);
            alert(err.message);
          },
        );
    },
    // 회원가입 페이지 클릭 이벤트
    clickSignupForm(event) {
      clickFormEvent(event.target);
    },
    // 마우스오버 이벤트
    overSignupForm(event) {
      overFormEvent(event.target);
    },
    // 리셋 버튼
    resetBtnForm() {
      resetFormEvent('signup');
    },
    // 마우스 아웃 이벤트
    outSignupForm(event) {
      outFormEvent(event);
    },
  },
};
</script>
