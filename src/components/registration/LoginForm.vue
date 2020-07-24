<template>
  <!-- 로그인 페이지 -->
  <div class="regist-form login-form">
    <div class="regist-form-cont">
      <h3>로그인</h3>
      <form class="form fade" action="" @submit.prevent="submitForm">
        <!-- 아이디 -->
        <div>
          <label for="username" v-if="!username">아이디</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <!-- 비밀번호 -->
        <div>
          <label for="password" v-if="!password">비밀번호</label>
          <input
            id="password"
            type="text"
            v-model="password"
            @click.prevent=""
          />
        </div>
        <!-- 회원정보 까먹었을때 찾는 버튼 -->
        <p><a href="" class="font-jua">비밀번호 찾기</a></p>
        <button class="add-btn font-jua">로그인</button>
      </form>
      <button class="reset-btn" @click.prevent="resetBtnForm()">
        되돌아가기
      </button>
    </div>

    <a
      href=""
      class="mask mask-login fade"
      @mouseover="overLoginForm($event)"
      @click.prevent="clickSignupForm($event)"
      @mouseout="outLoginForm()"
    >
      <i class="mask-icon mask-login"></i>
      <strong class="font-jua mask-login">로그인</strong>
    </a>
  </div>
</template>
<script>
import firebase from 'firebase';
import {
  clickFormEvent,
  globalMountedInLogin,
  overFormEvent,
  resetFormEvent,
  outFormEvent,
} from '@/js/register-event.js';
export default {
  data() {
    return {
      // register
      username: '',
      password: '',
      // event
    };
  },
  mounted() {
    // 이벤트 함수를 담당하는 js 함수에 element를 넘겨줘서 쉽게 dom을 제어할 수 있도록 함.
    globalMountedInLogin(this.$el);
  },
  methods: {
    // 로그인 양식 제출
    submitForm() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          function(user) {
            alert('로그인되었습니다!😊');
            console.log(user);
          },
          function(err) {
            alert(err.message);
          },
        );
      this.username = '';
      this.password = '';
    },
    // 클릭 이벤트
    clickSignupForm(event) {
      clickFormEvent(event.target);
    },
    // 마우스오버 이벤트
    overLoginForm(event) {
      overFormEvent(event.target);
    },
    // 리셋 버튼
    resetBtnForm() {
      resetFormEvent('login');
    },
    // 마우스 아웃 이벤트
    outLoginForm() {
      outFormEvent();
    },
  },
};
</script>
